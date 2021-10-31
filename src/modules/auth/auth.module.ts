import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthSharedModule } from './auth.shared-module'

@Module({
   imports: [AuthSharedModule],
   controllers: [AuthController],
})
export class AuthModule {}
