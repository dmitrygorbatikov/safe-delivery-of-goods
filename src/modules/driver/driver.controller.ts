import {Body, Controller, Post, Headers, Get} from '@nestjs/common';
import {DriverService} from "./driver.service";
import {ManagerService} from "../manager/manager.service";
import {AuthService} from "../auth/auth.service";
import {ApiBody, ApiCreatedResponse, ApiHeader, ApiTags} from "@nestjs/swagger";
import {RegisterDriverBodyDto} from "./dto/registerDriverBodyDto";
import {ErrorsEnum, RolesEnum} from "../../enums/enums";
import {getRegisterDate} from "../../helper/functions";
import {LoginDriverBodyDto} from "./dto/loginDriverBodyDto";
import {Driver} from "./driver.schema";

@ApiTags('driver')
@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService, private managerService: ManagerService, private authService: AuthService) {
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiBody({
        type: RegisterDriverBodyDto
    })
    @Post('/register')
    public async registerDriver(@Body() body: RegisterDriverBodyDto, @Headers() headers) {
        try {
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const {name, password, surname, email} = body

            const candidateManager = await this.managerService.findByEmail(email)
            if (candidateManager) {
                return {error: ErrorsEnum.exist}
            }
            const candidateDriver = await this.driverService.findByEmail(email)

            if (candidateDriver) {
                return {error: ErrorsEnum.exist}
            }
            const hashedPassword = await this.authService.passwordHash(password)
            const driver = await this.driverService.create({
                name,
                surname,
                email,
                password: hashedPassword,
                registerDate: getRegisterDate(),
                role: RolesEnum.driver
            })

            return {
                token: this.authService.accessToken(driver._id, name, surname, driver.role)
            }

        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiBody({
        type: LoginDriverBodyDto
    })
    @Post('/login')
    public async loginDriver(@Body() body: LoginDriverBodyDto) {
        try {
            const {password, email} = body
            const driver = await this.driverService.findByEmail(email)
            if (!driver) {
                return {error: ErrorsEnum.userNotFound}
            }
            const isMatch = await this.authService.bcryptPassword(password, driver.password)
            if (!isMatch) {
                return {error: ErrorsEnum.incorrectPassword}
            }
            return {token: this.authService.accessToken(driver._id, driver.name, driver.surname, driver.role)}
        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiCreatedResponse({
        type: Driver
    })
    @Get()
    public async getDriverProfile(@Headers() headers) {
        try {
            const decodeToken = await this.authService.decodeToken(headers.token)
            if (!decodeToken) {
                return {error: ErrorsEnum.userNotFound}
            }
            return {user: await this.driverService.findById(decodeToken.id)}
        } catch (e) {
            return {error: e.message}
        }
    }

}
