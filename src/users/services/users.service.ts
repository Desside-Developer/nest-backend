import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from '../enteties/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,) {}

    async createUser(data) {
        const reg = this.userRepository.create(data);
        await this.userRepository.save(reg);
    return 'success';
    }
}