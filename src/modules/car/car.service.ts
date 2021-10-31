import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Car, CarDocument} from "./car.schema";

@Injectable()
export class CarService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) {
    }

    public create(body: Car) {
        return new this.carModel(body).save()
    }

    public findById(_id: string) {
        return this.carModel.findById(_id)
    }

    public findByManagerId(managerId: string) {
        return this.carModel.find({managerId})
    }

    public find() {
        return this.carModel.find()
    }

    public findByStorageId(storageId: string) {
        return this.carModel.find({storageId})
    }

    public updateCarStatistic(
        _id: string,
        body: { indicators: any[] },
    ) {
        return this.carModel.findByIdAndUpdate(_id, body)
    }
}
