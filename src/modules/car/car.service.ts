import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Car, CarDocument} from "./car.schema";

@Injectable()
export class CarService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) {}
}
