import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @MaxLength(150)
  @IsNotEmpty()
  fname: string;

  @MaxLength(150)
  @IsNotEmpty()
  lname: string;

  @IsEmail({ host_whitelist: ['gmail.com', 'yahoo.com'] })
  email: string;

  @MaxLength(15)
  @MinLength(8)
  password: string;
}
