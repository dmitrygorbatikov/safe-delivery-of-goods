import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import {Shipping, ShippingSchema} from "./shipping.schema";
import {ShippingService} from "./shipping.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Shipping.name, schema: ShippingSchema }]),
        AuthSharedModule,
    ],
    providers: [ShippingService],
    exports: [ShippingService],
})
export class ShippingSharedModule {}
