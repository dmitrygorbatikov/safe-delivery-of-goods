import {Body, Controller, Get, Headers, Param, Post, Put, Query} from '@nestjs/common';
import {StorageService} from "./storage.service";
import {ApiBody, ApiCreatedResponse, ApiHeader, ApiParam, ApiTags} from "@nestjs/swagger";
import {ManagerService} from "../manager/manager.service";
import {CreateStorageBodyDto} from "./dto/createStorageBodyDto";
import {ErrorsEnum} from "../../enums/enums";
import {getRandomStorageIndicators, getRegisterDate} from "../../helper/functions";
import {Storage, StorageDocument} from "./storage.schema";
import {getRepository} from "typeorm";
import {Manager} from "../manager/manager.schema";
import {Model} from "mongoose";

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

    @ApiHeader({
        name: 'token'
    })
    @Get('/manager')
    public async getStoragesByManager(@Headers() headers, @Query() query) {
        try {
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            if (query.search && query.search !== '') {
                return {
                    storages: await this.storageService.findByManagerWithSearch(manager._id, query.search),
                }
            }
            return {
                storages: await this.storageService.findByManager(manager._id),
            }
        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiParam({
        name: 'id'
    })
    @Get('/:id')
    public async getStorageById(@Headers() headers, @Param() params) {
        try {
            const {id} = params
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const storage = await this.storageService.findById(id)
            if (!storage) {
                return {error: ErrorsEnum.storageNotFound}
            }
            return {storage}
        } catch (e) {
            return {error: e.message}
        }
    }

    @Put('/update-statistic')
    public async updateStorageStatistic(@Headers() headers) {
        try {
            const storages = await this.storageService.find()

            const indicators = []

            for (let i = 0; i < storages.length; i++) {
                indicators.push(storages[i].indicators)
                indicators[i].push(getRandomStorageIndicators())
            }
            for (let i = 0; i < storages.length; i++) {
                await this.storageService.updateStorageStatistic(storages[i]._id, {
                    indicators: indicators[i],
                })
            }

            return {message: "Storages updated"}
        } catch (e) {
            return {error: e.message}
        }
    }

}