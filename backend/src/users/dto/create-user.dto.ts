export class CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  password: string;
  notification_token?: string;
}
