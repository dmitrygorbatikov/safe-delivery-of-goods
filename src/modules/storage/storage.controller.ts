import {Body, Controller, Post, Headers} from '@nestjs/common';
import {StorageService} from "./storage.service";
import {ApiBody, ApiCreatedResponse, ApiHeader, ApiTags} from "@nestjs/swagger";
import {ManagerService} from "../manager/manager.service";
import {CreateStorageBodyDto} from "./dto/createStorageBodyDto";
import {ErrorsEnum} from "../../enums/enums";
import {getRegisterDate} from "../../helper/functions";
import {Storage} from "./storage.schema";

@ApiTags('storage')
@Controller('storage')
export class StorageController {
    constructor(private storageService: StorageService, private managerService: ManagerService) {
    }

    @ApiBody({
        type: CreateStorageBodyDto
    })
    @ApiHeader({
        name: 'token'
    })
    @ApiCreatedResponse({
        type: Storage
    })
    @Post()
    public async createStorage(@Body() body: CreateStorageBodyDto, @Headers() headers) {
        try {
            const {latitude, longitude, title, address} = body
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            return {
                storage: await this.storageService.create({
                    title,
                    address,
                    indicators: [],
                    latitude,
                    longitude,
                    registerDate: getRegisterDate(),
                    managerId: manager._id
                })
            }
        } catch (e) {
            return {error: e.message}
        }
    }

}