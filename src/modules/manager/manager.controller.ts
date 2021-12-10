import {Body, Controller, Get, Headers, Put} from '@nestjs/common';
import {ManagerService} from "./manager.service";
import {AuthService} from "../auth/auth.service";
import {ApiHeader, ApiTags} from "@nestjs/swagger";

@ApiTags('manager')
@Controller('manager')
export class ManagerController {
    constructor(private managerService: ManagerService, private authService: AuthService) {
    }

    @ApiHeader({
        name: 'token'
    })
    @Get()
    public async getManagerProfile(@Headers() headers) {
        try {
            const manager = await this.managerService.checkManagerRole(headers.token)
            if (!manager) {
                return {error: "Manager not found"}
            }
            return {manager}
        } catch (e) {
            return {error: e.message}
        }
    }

    @Put()
    public async updateManagerProfile(@Headers() headers, @Body() body) {
        try {
            const id = await this.managerService.checkManagerRoleAndId(headers.token)
            if (!id) {
                return {error: "Manager not found"}
            }
            await this.managerService.findByIdAndUpdateManager(body, id)
            const newManager = await this.managerService.findById(id)
            return {manager: newManager}
        } catch (e) {
            return {error: e.message}
        }
    }
}
