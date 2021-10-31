import {Controller, Get, Headers} from '@nestjs/common';
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
    public async getManagerProfile(@Headers() headers){
        try{
            return {manager: await this.managerService.checkManagerRole(headers.token)}
        }
        catch (e){
            return {error: e.message}
        }
    }


}
