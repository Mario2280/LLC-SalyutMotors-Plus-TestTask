import { UserService } from './users.service';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    this.logger.log('Get all users');
    const users = await this.userService.findAll();
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }

  @Get(':startIndex')
  async getOnePageUsersFrom(@Param('startIndex') startIndex: string) {
    this.logger.log('Get page of users');
    const users = await this.userService.pagination(parseInt(startIndex));
    return users.map((user) => UsersResponseDto.fromUsersEntity(user));
  }
}
