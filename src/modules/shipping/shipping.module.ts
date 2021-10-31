import {Module} from '@nestjs/common';
import {AuthSharedModule} from "../auth/auth.shared-module";
import {ShippingController} from "./shipping.controller";
import {ShippingSharedModule} from "./shipping-shared.module";
import {ManagerSharedModule} from "../manager/manager-shared.module";
import {CarSharedModule} from "../car/car-shared.module";
import {DriverSharedModule} from "../driver/driver-shared.module";
import {ProductSharedModule} from "../product/product-shared.module";
import {StorageSharedModule} from "../storage/storage-shared.module";

@Module({
    controllers: [ShippingController],
    imports: [
        ShippingSharedModule,
        AuthSharedModule,
        ManagerSharedModule,
        CarSharedModule,
        DriverSharedModule,
        ProductSharedModule,
        StorageSharedModule
    ],
})
export class ShippingModule {
}
