import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Shipping, ShippingDocument} from "./shipping.schema";

@Injectable()
export class ShippingService {
    constructor(
        @InjectModel(Shipping.name) private shippingModel: Model<ShippingDocument>,
    ) {}
}