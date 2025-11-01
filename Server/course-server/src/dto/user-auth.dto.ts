import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class UserAuthDTO {
  @IsEmail({}, { message: 'Email invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is not empty' })
  @MinLength(6)
  password: string;
}
