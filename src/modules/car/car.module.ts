import { Module } from '@nestjs/common';
import {AuthSharedModule} from "../auth/auth.shared-module";
import {CarController} from "./car.controller";
import {CarSharedModule} from "./car-shared.module";
import {ManagerSharedModule} from "../manager/manager-shared.module";
import {StorageSharedModule} from "../storage/storage-shared.module";

@Module({
    controllers: [CarController],
    imports: [CarSharedModule, AuthSharedModule, ManagerSharedModule, StorageSharedModule],
})
export class CarModule {}
