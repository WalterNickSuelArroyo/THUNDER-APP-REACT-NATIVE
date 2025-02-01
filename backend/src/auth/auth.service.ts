import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { User } from "src/users/user.entity";
import { In, Repository } from "typeorm";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { Rol } from "src/roles/rol.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
    private jwtService: JwtService
  ) {}
  async register(user: RegisterAuthDto) {
    const { email, phone } = user;
    const emailExists = await this.usersRepository.findOneBy({
      email: email,
    });
    if (emailExists) {
      throw new HttpException(
        "El correo ya está registrado",
        HttpStatus.CONFLICT
      );
    }

    const phoneExists = await this.usersRepository.findOneBy({
      phone: phone,
    });
    if (phoneExists) {
      throw new HttpException(
        "El teléfono ya está registrado",
        HttpStatus.CONFLICT
      );
    }
    const newUser = this.usersRepository.create(user);
    let rolesIds = [];
    if (user.rolesIds !== undefined && user.rolesIds !== null) {
      rolesIds = user.rolesIds;
    } else {
      rolesIds.push("CLIENT");
    }
    const roles = await this.rolesRepository.findBy({ id: In(rolesIds) });
    newUser.roles = roles;
    const userSaved = await this.usersRepository.save(newUser);
    const rolesString = userSaved.roles.map((role) => role.id);
    const payload = {
      id: userSaved.id,
      name: userSaved.name,
      roles: rolesString,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      user: userSaved,
      token: "Bearer " + token,
    };

    delete data.user.password;

    return data;
  }

  async login(user: LoginAuthDto) {
    const { email, password } = user;
    const userFound = await this.usersRepository.findOne({
      where: { email: email },
      relations: ["roles"],
    });
    if (!userFound) {
      throw new HttpException(
        "El correo no está registrado",
        HttpStatus.NOT_FOUND
      );
    }
    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      throw new HttpException(
        "La contraseña no es válida",
        HttpStatus.UNAUTHORIZED
      );
    }

    const rolesIds = userFound.roles.map((role) => role.id);

    const payload = {
      id: userFound.id,
      name: userFound.name,
      roles: rolesIds,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      user: userFound,
      token: "Bearer " + token,
    };

    delete data.user.password;

    return data;
  }
}
