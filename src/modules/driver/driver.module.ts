import {Module} from '@nestjs/common';
import {AuthSharedModule} from "../auth/auth.shared-module";
import {DriverController} from "./driver.controller";
import {DriverSharedModule} from "./driver-shared.module";
import {ManagerSharedModule} from "../manager/manager-shared.module";

@Module({
    controllers: [DriverController],
    imports: [DriverSharedModule, AuthSharedModule, ManagerSharedModule],
})
export class DriverModule {
}
