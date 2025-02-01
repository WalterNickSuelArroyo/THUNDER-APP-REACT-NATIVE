import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: "El correo electrónico no es válido" })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
