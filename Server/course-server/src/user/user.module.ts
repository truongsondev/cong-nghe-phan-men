import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
