import {Body, Controller, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {ApiBody, ApiCreatedResponse, ApiTags} from '@nestjs/swagger'
import {RegisterManagerBodyDto} from "./dto/registerManagerBodyDto";
import {ManagerService} from "../manager/manager.service";
import {ErrorsEnum, RolesEnum} from "../../enums/enums";
import {getRegisterDate} from "../../helper/functions";
import {Manager} from "../manager/manager.schema";
import {LoginManagerBodyDto} from "./dto/loginManagerBodyDto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private managerService: ManagerService,
    ) {
    }

    @ApiBody({
        type: RegisterManagerBodyDto
    })
    @ApiCreatedResponse({
        type: Manager
    })
    @Post('/register')
    public async registerManager(@Body() body: RegisterManagerBodyDto) {
        try {
            const {name,password,surname,email} = body
            const candidate = await this.managerService.findByEmail(email)
            if(candidate){
                return {error: ErrorsEnum.exist}
            }
            const hashedPassword = await this.authService.passwordHash(password)
            const manager = await this.managerService.create({
                name,
                surname,
                email,
                password: hashedPassword,
                registerDate: getRegisterDate(),
                role: RolesEnum.manager
            })

            return {
                token: this.authService.accessToken(manager._id, name, surname, manager.role)
            }

        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiBody({type: LoginManagerBodyDto})
    @Post('/login')
    public async loginManager(@Body() body: LoginManagerBodyDto){
        try{
            const {password, email} = body
            const manager = await this.managerService.findByEmail(email)
            if(!manager){
                return {error: ErrorsEnum.userNotFound}
            }
            const isMatch = await this.authService.bcryptPassword(password, manager.password)
            if(!isMatch){
                return {error: ErrorsEnum.incorrectPassword}
            }
            return { token: this.authService.accessToken(manager._id, manager.name, manager.surname, manager.role)}
        }
        catch (e) {
            return {error: e.message}
        }
    }

}
