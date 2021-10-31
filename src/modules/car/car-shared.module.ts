import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import {Car, CarSchema} from "./car.schema";
import {CarService} from "./car.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
        AuthSharedModule,
    ],
    providers: [CarService],
    exports: [CarService],
})
export class CarSharedModule {}
