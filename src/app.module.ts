import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./modules/auth/auth.module";
import { CarModule } from './modules/car/car.module';
import { DriverModule } from './modules/driver/driver.module';
import { ManagerModule } from './modules/manager/manager.module';
import { ProductModule } from './modules/product/product.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    CarModule,
    DriverModule,
    ManagerModule,
    ProductModule,
    ShippingModule,
    StorageModule,
  ],
  providers: [AppModule],
})
export class AppModule {}
