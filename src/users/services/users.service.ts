import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../enteties/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly Repository: Repository<UsersEntity>,) {}

    async createUser(data) {
        const reg = await this.Repository.create(data);
        await this.Repository.save(reg);
    return 'success';
    }
}