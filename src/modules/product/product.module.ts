import {Module} from '@nestjs/common';
import {AuthSharedModule} from "../auth/auth.shared-module";
import {ProductController} from "./product.controller";
import {ProductSharedModule} from "./product-shared.module";
import {ManagerSharedModule} from "../manager/manager-shared.module";
import {StorageSharedModule} from "../storage/storage-shared.module";

@Module({
    controllers: [ProductController],
    imports: [ProductSharedModule, AuthSharedModule, ManagerSharedModule, StorageSharedModule],
})
export class ProductModule {
}
