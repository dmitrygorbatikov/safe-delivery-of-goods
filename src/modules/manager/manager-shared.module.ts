import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import {Manager, ManagerSchema} from "./manager.schema";
import {ManagerService} from "./manager.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
        AuthSharedModule,
    ],
    providers: [ManagerService],
    exports: [ManagerService],
})
export class ManagerSharedModule {}
