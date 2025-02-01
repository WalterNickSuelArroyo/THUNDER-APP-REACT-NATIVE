import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async register(user: RegisterAuthDto) {
    const { email, phone } = user;
    const emailExists = await this.usersRepository.findOneBy({
      email: email,
    });
    if (emailExists) {
      return new HttpException(
        "El correo ya está registrado",
        HttpStatus.CONFLICT
      );
    }

    const phoneExists = await this.usersRepository.findOneBy({
      phone: phone,
    });
    if (phoneExists) {
      return new HttpException(
        "El teléfono ya está registrado",
        HttpStatus.CONFLICT
      );
    }
    const newUser = this.usersRepository.create(user);
    const userSaved = await this.usersRepository.save(newUser);

    const payload = { id: userSaved.id, name: userSaved.name };
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
    const userFound = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!userFound) {
      return new HttpException(
        "El correo no está registrado",
        HttpStatus.NOT_FOUND
      );
    }
    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      return new HttpException(
        "La contraseña no es válida",
        HttpStatus.UNAUTHORIZED
      );
    }

    const payload = { id: userFound.id, name: userFound.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user: userFound,
      token: "Bearer " + token,
    };

    delete data.user.password;

    return data;
  }
}
