import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../enteties/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly TestRepository: Repository<UsersEntity>,
  ) {}
  async findAll() {
    return await this.TestRepository.find();
  }
  async findUsernames() {
    const users = await this.TestRepository.find();
    return users.map((username) => username.username);
  }
  async findEmails() {
    const UsersInfoEmails = await this.TestRepository.find();
    return UsersInfoEmails.map((email) => email.email);
  }
  async findPass() {
    const UsersInfoPass = await this.TestRepository.find();
    return UsersInfoPass.map((pass) => pass.password);
  }
  async findWebTokens() {
    const UsersWebToken = await this.TestRepository.find();
    return UsersWebToken.map((webtoken) => webtoken.confirmationToken);
  }
}
