import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail({}, { message: 'Email invalid' })
  email: string;

  @IsNotEmpty({ message: 'OTP is not empty' })
  @Matches(/^\d{6}$/, { message: 'OTP must include 6 digit' })
  otp: string;
}
