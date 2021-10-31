import { Module } from '@nestjs/common';
import {ManagerController} from "./manager.controller";
import {AuthSharedModule} from "../auth/auth.shared-module";
import {ManagerSharedModule} from "./manager-shared.module";

@Module({
    controllers: [ManagerController],
    imports: [ManagerSharedModule, AuthSharedModule],
})
export class ManagerModule {}
