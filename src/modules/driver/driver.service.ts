import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Driver, DriverDocument} from "./driver.schema";
import {RolesEnum} from "../../enums/enums";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DriverService {
    constructor(
        @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
        private authService: AuthService
    ) {
    }

    public create(body: Driver) {
        return new this.driverModel(body).save()
    }

    public findByManager(managerId: string) {
        return this.driverModel.find({managerId})
    }

    public findById(_id: string) {
        return this.driverModel.findById(_id)
    }

    public findByEmail(email: string) {
        return this.driverModel.findOne({email})
    }

    public checkDriverRole(token: string) {
        const decodeToken = this.authService.decodeToken(token)
        const {role, id} = decodeToken
        if (role !== RolesEnum.driver) {
            return false
        }
        return this.findById(id);
    }
}
