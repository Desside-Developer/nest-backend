import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../users/enteties/users.entity';
import { NetworkEntity } from '../enteties/network.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import any = jasmine.any;

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly UsersRepostory: Repository<UsersEntity>,
    @InjectRepository(NetworkEntity)
    private readonly NetworkRepository: Repository<NetworkEntity>,
  ) {}
  async networkSave(data) {
    const findOneByEmailUser = await this.UsersRepostory.findOneBy({
      email: data.email,
    });
    if (!findOneByEmailUser) {
      return { message: 'Your email not corrected!' };
    } else {
      const checkUserPass = await bcrypt.compare(
        String(data.password),
        findOneByEmailUser.password,
      );
      if (checkUserPass) {
        if (findOneByEmailUser.ApiToken === null) {
          return { message: 'You dont have ApiToken' };
        } else {
          const user = await this.networksApiUrl(findOneByEmailUser.ApiToken);
          await this.clearDataNetworks();
          await this.saveDataNetworks(user);
          return { message: 'User found, and save database.' };
        }
      } else {
        return { message: 'Your password not corrected!' };
      }
    }
  }
  async networksApiUrl(ApiToken) {
    const getApiNetworks = `https://cpaw.cat/api/mon/network.json?token=${ApiToken}`;
    const response = await axios.get(getApiNetworks);
    return response.data;
  }
  async saveDataNetworks(data) {
    const networkEntities = [];
    for (const key in data) {
      const networkData = data[key];
      // const authsString = Array.isArray(networkData.auths) ? networkData.auths.join(', ') : '';
      const createNetworks = this.NetworkRepository.create({
        OfferId: networkData.id,
        name: networkData.name,
        domain: networkData.domain,
        offer: networkData.offer,
        auths: networkData.auths,
      });
      networkEntities.push(createNetworks);
    }
    try {
      await this.NetworkRepository.save(networkEntities);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  async clearDataNetworks() {
    await this.NetworkRepository.createQueryBuilder('networks')
      .delete()
      .from(NetworkEntity)
      .execute();
  }
}
