import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('profile/:userId')
  getUserProfile(@Param('userId') userId: string) {
    return this.userService.getUserProfile(userId);
  }

  @Patch('update-profile/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { fullName?: string; bio?: string },
  ) {
    return this.userService.updateUserProfile(id, body);
  }
}
