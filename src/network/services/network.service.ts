import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../../users/enteties/users.entity";
import {NetworkEntity} from "../enteties/network.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import axios from "axios";


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
                findOneByEmailUser.password,
                data.password
            );
            if (checkUserPass !== null) {
                const user = await this.networksApiUrl(findOneByEmailUser.ApiToken);
                await this.saveDataNetworks(user);
            } else {
                return { message: 'Your password not corrected!' };
            }
            return { message: 'User found, and save database.' }
        }
    }
    async networksApiUrl(ApiToken) {
        const getApiNetworks = `https://cpaw.cat/api/mon/network.json?token=${ApiToken}`;
        const response = await axios.get(getApiNetworks);
        return response.data;
    }
    async saveDataNetworks(data: any){
        const createNetworks = this.NetworkRepository.create(data);
        await this.NetworkRepository.save({
            OfferId: data.id,
            name: data.name,
            domain: data.domain,
            offer: data.offer,
            auths: data.auths,
        });
        // сохранение в базу
    }
}