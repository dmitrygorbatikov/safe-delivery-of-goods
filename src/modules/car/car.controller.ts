import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common';
import {CarService} from "./car.service";
import {ApiBody, ApiHeader, ApiParam, ApiTags} from "@nestjs/swagger";
import {ManagerService} from "../manager/manager.service";
import {CreateCarBodyDto} from "./dto/createCarBodyDto";
import {CarConditionEnum, CarStatusEnum, ErrorsEnum, ProductEnum} from "../../enums/enums";
import {getRegisterDate} from "../../helper/functions";
import {StorageService} from "../storage/storage.service";

@ApiTags('car')
@Controller('car')
export class CarController {
    constructor(private carService: CarService, private managerService: ManagerService, private storageService: StorageService) {
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiBody({
        type: CreateCarBodyDto
    })
    @Post()
    public async createCar(@Body() body: CreateCarBodyDto, @Headers() headers) {
        try {
            const {carryingCapacity, model, number, price, storageId, driverId} = body
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            if (carryingCapacity > ProductEnum.maxWeight) {
                return {error: `Carrying capacity can't be more than ${ProductEnum.maxWeight}`}
            }
            const storage = await this.storageService.findById(storageId)
            if (!storage) {
                return {error: ErrorsEnum.storageNotFound}
            }
            return {
                car: await this.carService.create({
                    carryingCapacity,
                    model,
                    number,
                    price,
                    storageId,
                    driverId,
                    registerDate: getRegisterDate(),
                    condition: CarConditionEnum.ready,
                    indicators: [],
                    latitude: storage.latitude,
                    longitude: storage.longitude,
                    status: CarStatusEnum.atStorage,
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
    @ApiParam({
        name: 'id'
    })
    @Get('/:id')
    public async getCarById(@Param() params, @Headers() headers) {
        try {
            const {id} = params
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const car = await this.carService.findById(id)
            if (!car) {
                return {error: 'Car not found'}
            }
            if(car.managerId != manager._id){
                return {error: "It is not your car"}
            }
            return {car}

        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name: 'token'
    })
    @Get()
    public async getAllCarsList(@Param() params, @Headers() headers) {
        try {
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            return {cars: await this.carService.findByManagerId(manager._id)}

        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name: 'token'
    })
    @Get('/storage/:id')
    public async getCarsListByStorageId(@Headers() headers, @Param() params) {
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
            return {cars: await this.carService.findByStorageId(id)}
        } catch (e) {
            return {error: e.message}
        }
    }
}
