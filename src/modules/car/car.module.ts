import { Module } from '@nestjs/common';
import {AuthSharedModule} from "../auth/auth.shared-module";
import {CarController} from "./car.controller";
import {CarSharedModule} from "./car-shared.module";

@Module({
    controllers: [CarController],
    imports: [CarSharedModule, AuthSharedModule],
})
export class CarModule {}
