import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import {Driver, DriverSchema} from "./driver.schema";
import {DriverService} from "./driver.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
        AuthSharedModule,
    ],
    providers: [DriverService],
    exports: [DriverService],
})
export class DriverSharedModule {}
