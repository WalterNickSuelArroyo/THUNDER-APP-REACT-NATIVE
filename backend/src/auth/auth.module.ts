import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rol } from "src/roles/rol.entity";
import { RolesService } from "src/roles/roles.service";
import { User } from "src/users/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./jwt/jwt.constants";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rol]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "12h" },
    }),
  ],
  providers: [AuthService, RolesService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
