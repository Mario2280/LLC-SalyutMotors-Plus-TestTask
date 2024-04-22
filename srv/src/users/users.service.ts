import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

const USER_PER_PAGE = 20;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepo.find();
  }

  async pagination(offset: number): Promise<UsersEntity[]> {
    return await this.usersRepo
      .createQueryBuilder('users')
      .where('users.id >= :offset', { offset })
      .orderBy('users.id', 'ASC')
      .limit(USER_PER_PAGE)
      .getMany();

    //slower
    //await this.usersRepo
    //  .createQueryBuilder('users')
    //  .offset(offset)
    //  .limit(20)
    //  .getMany();
  }
}
