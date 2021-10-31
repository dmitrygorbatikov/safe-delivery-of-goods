import {Module} from '@nestjs/common';
import {AuthSharedModule} from "../auth/auth.shared-module";
import {ShippingController} from "./shipping.controller";
import {ShippingSharedModule} from "./shipping-shared.module";

@Module({
    controllers: [ShippingController],
    imports: [ShippingSharedModule, AuthSharedModule],
})
export class ShippingModule {
}
