import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
   ) {}
}
