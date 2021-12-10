import {Body, Controller, Get, Headers, Param, Post, Put, Query} from '@nestjs/common';
import {ShippingService} from "./shipping.service";
import {CarStatusEnum, ErrorsEnum, ProductEnum, ShippingStatusEnum} from "../../enums/enums";
import {ApiBody, ApiHeader, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {ManagerService} from "../manager/manager.service";
import {getRegisterDate} from "../../helper/functions";
import {PlannedProductBodyDto} from "./dto/plannedProductBodyDto";
import {CarService} from "../car/car.service";
import {DriverService} from "../driver/driver.service";
import {ProductService} from "../product/product.service";
import {StorageService} from "../storage/storage.service";

@ApiTags('shipping')
@Controller('shipping')
export class ShippingController {
    constructor(
        private shippingService: ShippingService,
        private managerService: ManagerService,
        private carService: CarService,
        private driverService: DriverService,
        private productService: ProductService,
        private storageService: StorageService,
    ) {
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiBody({
        type: PlannedProductBodyDto
    })
    @Post()
    public async plannedProduct(@Headers() headers, @Body() body: PlannedProductBodyDto) {
        try {
            const {goods, carId, driverId, storageFrom, storageTo} = body
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const car = await this.carService.findById(carId)
            if (!car) {
                return {error: "Car not found"}
            }

            const driver = await this.driverService.findById(driverId)
            if (!driver) {
                return {error: "Driver not found"}
            }
            let goodsWeightSum = 0
            for (let i = 0; i < goods.length; i++) {
                goodsWeightSum += goods[i].weight
            }
            if (goodsWeightSum > ProductEnum.maxWeight) {
                return {error: `Goods weight can't be more than ${ProductEnum.maxWeight}`}
            }
            if (car.carryingCapacity < goodsWeightSum) {
                return {error: `Goods weight can't be more than car carrying capacity(${car.carryingCapacity})`}
            }
            const shipping = await this.shippingService.create({
                arrivalTime: 0,
                carId,
                driverId,
                registerDate: getRegisterDate(),
                status: ShippingStatusEnum.planned,
                managerId: manager._id,
                dispatchTime: 0,
                goods,
                storageFrom,
                storageTo
            })
            for (let i = 0; i < goods.length; i++) {
                await this.productService.deleteProductById(goods[i]._id)
            }

            return {shipping}

        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name:'token'
    })
    @ApiQuery({
        name: 'id'
    })
    @Get('/driver')
    public async getShippingByDriver(@Headers() headers, @Query() query) {
        try{
            const driver = await this.driverService.checkDriverRole(headers.token)
            if (!driver) {
                return {error: "Driver not found"}
            }
            if(query.search && query.search !== ''){
                return {shipping: await this.shippingService.findByDriverIdWithSearch(driver._id, query.search)}
            }
            return {shipping: await this.shippingService.findByDriver(driver._id)}
        }
        catch (e) {
            return {error: e.message}
        }
    }

    @ApiParam({
        name: 'id'
    })
    @ApiHeader({
        name: 'token'
    })
    @Put('/sent/:id')
    public async sentProduct(@Headers() headers, @Param() params) {
        try {
            const {id} = params
            const driver = await this.driverService.checkDriverRole(headers.token)
            if (!driver) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const shipping = await this.shippingService.findById(id)
            if (!shipping) {
                return {error: 'Shipping not found'}
            }
            const car = await this.carService.findById(shipping.carId)
            if (!car) {
                return {error: "Car not found"}
            }
            car.status = CarStatusEnum.onRoad
            shipping.arrivalTime = getRegisterDate()
            shipping.status = ShippingStatusEnum.sent
            shipping.save()
            return {shipping}

        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiQuery({
        name: 'id'
    })
    @ApiHeader({
        name: 'token'
    })
    @Put('/delivered')
    public async deliveredProduct(@Headers() headers, @Query() query) {
        try {
            const {id} = query
            const driver = await this.driverService.checkDriverRole(headers.token)
            if (!driver) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const shipping = await this.shippingService.findById(id)
            if (!shipping) {
                return {error: 'Shipping not found'}
            }
            shipping.arrivalTime = getRegisterDate()
            shipping.status = ShippingStatusEnum.delivered
            shipping.save()
            const car = await this.carService.findById(shipping.carId)
            if (!car) {
                return {error: "Car not found"}
            }
            const storage = await this.storageService.findById(shipping.storageTo)
            if (!storage) {
                return {error: ErrorsEnum.storageNotFound}
            }
            car.storageId = shipping.storageTo
            car.longitude = storage.longitude
            car.latitude = storage.latitude
            car.status = CarStatusEnum.atStorage
            car.save()
            const goods = shipping.goods
            for (let i = 0; i < goods.length; i++) {
                await this.productService.create({
                    title: goods[i].title,
                    weight: goods[i].weight,
                    carId: "",
                    registerDate: goods[i].registerDate,
                    managerId: goods[i].managerId,
                    storageId: shipping.storageTo
                })
            }
            return {shipping}

        } catch (e) {
            return {error: e.message}
        }
    }

    @Get()
    public async getShippingList(@Headers() headers, @Query() query) {
        try{
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            if(query.search && query.search !== ''){
                return {shipping: await this.shippingService.findByManagerIdWithSearch(manager._id, query.search)}
            }
            return {shipping: await this.shippingService.findByManager(manager._id)}
        }
        catch (e) {
            return {error: e.message}
        }
    }
}
