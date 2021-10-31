import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductBodyDto} from "./dto/createProductBodyDto";
import {ManagerService} from "../manager/manager.service";
import {ApiBody, ApiCreatedResponse, ApiHeader, ApiParam, ApiTags} from "@nestjs/swagger";
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
            const {storageId, weight, title} = body
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const storage = await this.storageService.findById(storageId)
            if (!storage) {
                return {error: ErrorsEnum.storageNotFound}
            }
            if (weight < 0 || weight > ProductEnum.maxWeight) {
                return {error: `Weight can't be more than ${ProductEnum.maxWeight}`}
            }
            return {
                product: await this.productService.create({
                    carId: '',
                    registerDate: getRegisterDate(),
                    title,
                    storageId,
                    weight,
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
    public async getProductById(@Headers() headers, @Param() params) {
        try {
            const {id} = params
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const product = await this.productService.findById(id)
            if (!product) {
                return {error: 'Product not found'}
            }
            return {product}
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
    @Get('/storage/:id')
    public async getProductsByStorageId(@Headers() headers, @Param() params) {
        try {
            const {id} = params
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const products = await this.productService.findByStorageId(id)
            return {products}
        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name: 'token'
    })
    @Get()
    public async getProductsByManager(@Headers() headers) {
        try {
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const products = await this.productService.findByManager(manager._id)
            return {products}
        } catch (e) {
            return {error: e.message}
        }
    }
}
