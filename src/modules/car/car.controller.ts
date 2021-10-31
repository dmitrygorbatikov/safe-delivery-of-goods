import {Body, Controller, Get, Headers, Param, Post, Put, Query} from '@nestjs/common';
import {CarService} from "./car.service";
import {ApiBody, ApiHeader, ApiParam, ApiTags} from "@nestjs/swagger";
import {ManagerService} from "../manager/manager.service";
import {CreateCarBodyDto} from "./dto/createCarBodyDto";
import {CarConditionEnum, CarStatusEnum, ErrorsEnum, ProductEnum} from "../../enums/enums";
import {getRandomCarIndicators, getRegisterDate} from "../../helper/functions";
import {StorageService} from "../storage/storage.service";
import {DriverService} from "../driver/driver.service";

@ApiTags('car')
@Controller('car')
export class CarController {
    constructor(private carService: CarService, private managerService: ManagerService, private storageService: StorageService, private driverService: DriverService) {
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
            if (car.managerId != manager._id) {
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

    @Put('/update-statistic')
    public async putCarIndicators(@Param() params) {
        try {
            const cars = await this.carService.find()
            const indicators = []
            for (let i = 0; i < cars.length; i++) {
                indicators.push(cars[i].indicators)
                indicators[i].push(getRandomCarIndicators())
            }
            for (let i = 0; i < indicators.length; i++) {
                await this.carService.updateCarStatistic(cars[i]._id, {
                    indicators: indicators[i],
                })
            }
            return {message: "Statistic updated"}
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
    @Put('/status/:id')
    public async changeCarStatus(@Headers() headers, @Param() params, @Query() query) {
        try {
            const {id} = params
            const {condition} = query
            const driver = await this.driverService.checkDriverRole(headers.token)
            if (!driver) {
                return {error: ErrorsEnum.notEnoughRights}
            }

            const car = await this.carService.findById(id)
            if (!car) {
                return {error: "Car not found"}
            }
            if (condition !== CarConditionEnum.ready || condition !== CarConditionEnum.notReady || condition !== CarConditionEnum.slightlyDamaged) {
                return {error: "Incorrect condition"}
            }
            car.condition = condition
            car.save()
            return {car}
        } catch (e) {

        }
    }
}
