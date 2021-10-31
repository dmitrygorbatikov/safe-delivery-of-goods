import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthSharedModule } from './auth.shared-module'
import {ManagerSharedModule} from "../manager/manager-shared.module";

@Module({
   imports: [AuthSharedModule, ManagerSharedModule],
   controllers: [AuthController],
})
export class AuthModule {}
