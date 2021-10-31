import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Car, CarDocument} from "./car.schema";
import {Storage} from "../storage/storage.schema";

@Injectable()
export class CarService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) {}

    public create(body: Car) {
        return new this.carModel(body).save()
    }

    public findById(_id: string){
        return this.carModel.findById(_id)
    }

    public findByManagerId(managerId: string){
        return this.carModel.find({managerId})
    }

    public findByStorageId(storageId: string){
        return this.carModel.find({storageId})
    }
}
