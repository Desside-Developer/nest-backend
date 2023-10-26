import {Body, Controller, Post, Request} from "@nestjs/common";
import {NetworkService} from "../services/network.service";
import {NetworkDto} from "../../users/dto/user.dto";

@Controller('/network')
export class NetworkController {
    constructor(private readonly networkService: NetworkService) {}
    @Post('/createAndSave')
    async createAndSaveNetworks(@Body() checkUserEmailAndPass: NetworkDto) {
        const networkData = await this.networkService.networkSave(checkUserEmailAndPass);
    }
}