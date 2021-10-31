import {Body, Controller, Post, Headers} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductBodyDto} from "./dto/createProductBodyDto";
import {ManagerService} from "../manager/manager.service";
import {ApiBody, ApiCreatedResponse, ApiHeader, ApiTags} from "@nestjs/swagger";
import {ErrorsEnum, ProductEnum} from "../../enums/enums";
import {getRegisterDate} from "../../helper/functions";
import {StorageService} from "../storage/storage.service";
import {Product} from "./product.schema";

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService, private managerService: ManagerService, private storageService: StorageService) {
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiBody({
        type: CreateProductBodyDto
    })
    @ApiCreatedResponse({
        type: Product
    })
    @Post()
    public async createProduct(@Body() body: CreateProductBodyDto, @Headers() headers) {
        try {
            const {storageFrom, storageTo, weight, title} = body
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const storageFromCheck = await this.storageService.findById(storageFrom)
            if (!storageFromCheck) {
                return {error: ErrorsEnum.storageNotFound}
            }
            if (storageTo === storageFrom) {
                return {error: 'Select right storages'}
            }
            const storageToCheck = await this.storageService.findById(storageTo)
            if (!storageToCheck) {
                return {error: ErrorsEnum.storageNotFound}
            }
            if (weight < 0 || weight > ProductEnum.maxWeight) {
                return {error: 'Weight can`t be more than 50000'}
            }
            return {
                product: await this.productService.create({
                    carId: '',
                    registerDate: getRegisterDate(),
                    storageFrom,
                    title,
                    storageTo,
                    weight
                })
            }
        } catch (e) {
            return {error: e.message}
        }
    }
}
