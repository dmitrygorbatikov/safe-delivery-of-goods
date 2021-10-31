import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import {Product, ProductSchema} from "./product.schema";
import {ProductService} from "./product.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
        AuthSharedModule,
    ],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductSharedModule {}
