import { IsString } from 'class-validator';

export class UserUpdate {
  @IsString()
  userId: string;
  @IsString()
  full_name: string;
  @IsString()
  bio: string;
}
