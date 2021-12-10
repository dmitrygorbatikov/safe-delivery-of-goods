import {Body, Controller, Post, Headers, Get, Param, Query, Put} from '@nestjs/common';
import {DriverService} from "./driver.service";
import {ManagerService} from "../manager/manager.service";
import {AuthService} from "../auth/auth.service";
import {ApiBody, ApiCreatedResponse, ApiHeader, ApiParam, ApiTags} from "@nestjs/swagger";
import {RegisterDriverBodyDto} from "./dto/registerDriverBodyDto";
import {ErrorsEnum, RolesEnum} from "../../enums/enums";
import {getRegisterDate} from "../../helper/functions";
import {LoginDriverBodyDto} from "./dto/loginDriverBodyDto";
import {Driver} from "./driver.schema";
import {StorageService} from "../storage/storage.service";

@ApiTags('driver')
@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService, private managerService: ManagerService, private storageService: StorageService, private authService: AuthService) {
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
                role: RolesEnum.driver,
                managerId: manager._id
            })

            return {driver}

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
    @Get('/profile')
    public async getDriverProfile(@Headers() headers) {
        try {
            const decodeToken = await this.authService.decodeToken(headers.token)
            if (!decodeToken) {
                return {error: ErrorsEnum.userNotFound}
            }
            const driver = await this.driverService.findById(decodeToken.id)
            if (!driver) {
                return {error: 'Driver not found'}
            }
            return {driver}
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
    @ApiParam({
        name: 'id'
    })
    @Get('/get-by-manager/:id')
    public async getDriverById(@Headers() headers, @Param() params) {
        try {
            const {id} = params
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const driver = await this.driverService.findById(id)
            if (!driver) {
                return {error: 'Driver not found'}
            }
            return {driver}
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
    public async getDriversListByManager(@Headers() headers, @Query() query) {
        try {
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            if(query.search && query.search !== ''){
                return { drivers: await this.driverService.findByManagerIdWithSearch(manager._id, query.search)}
            }
            return { drivers: await this.driverService.findByManager(manager._id)}
        } catch (e) {
            return {error: e.message}
        }
    }

    @ApiHeader({
        name: 'token'
    })
    @ApiParam({
        name: 'id'
    })
    @Get('/storage/list/:id')
    public async getDriversListByStorageId(@Headers() headers, @Param() params) {
        try {
            const {id} = params
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: ErrorsEnum.notEnoughRights}
            }
            const storage = await this.storageService.findById(id)
            if (!storage) {
                return {error: ErrorsEnum.storageNotFound}
            }
            return { drivers: await this.driverService.findByStorageId(manager._id)}
        } catch (e) {
            return {error: e.message}
        }
    }

    @Put()
    public async updateDriverProfile(@Headers() headers, @Body() body) {
        try {
            const id = await this.driverService.checkDriverRoleAndId(headers.token)
            if (!id) {
                return {error: "Driver not found"}
            }
            await this.driverService.findByIdAndUpdateDriver(body, id)
            const newDriver = await this.driverService.findById(id)
            return {driver: newDriver}
        } catch (e) {
            return {error: e.message}
        }
    }

}
