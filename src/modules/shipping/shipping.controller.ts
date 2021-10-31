import {Body, Controller, Headers, Post, Put, Query} from '@nestjs/common';
import {ShippingService} from "./shipping.service";
import {ErrorsEnum, ShippingStatusEnum} from "../../enums/enums";
import {ApiBody, ApiHeader, ApiQuery} from "@nestjs/swagger";
import {ManagerService} from "../manager/manager.service";
import {getRegisterDate} from "../../helper/functions";
import {PlannedProductBodyDto} from "./dto/plannedProductBodyDto";
import {CarService} from "../car/car.service";
import {DriverService} from "../driver/driver.service";
import {ProductService} from "../product/product.service";

@Controller('shipping')
export class ShippingController {
    constructor(
        private shippingService: ShippingService,
        private managerService: ManagerService,
        private carService: CarService,
        private driverService: DriverService,
        private productService: ProductService
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
    
    @ApiQuery({
        name: 'id'
    })
    @Put('/sent/:id')
    public async setProduct(@Headers() headers, @Query() query) {
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
            shipping.dispatchTime = getRegisterDate()
            shipping.status = ShippingStatusEnum.sent
            shipping.save()
            return shipping

        } catch (e) {
            return {error: e.message}
        }
    }

}
