import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Driver, DriverDocument} from "./driver.schema";

@Injectable()
export class DriverService {
    constructor(
        @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    ) {}

    public create(body: Driver) {
        return new this.driverModel(body).save()
    }

    public findById(_id: string){
        return this.driverModel.findById(_id)
    }

    public findByEmail(email: string){
        return this.driverModel.findOne({email})
    }
}
