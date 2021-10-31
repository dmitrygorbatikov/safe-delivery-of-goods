import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import {Storage, StorageSchema} from "./storage.schema";
import {StorageService} from "./storage.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Storage.name, schema: StorageSchema }]),
        AuthSharedModule,
    ],
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageSharedModule {}
