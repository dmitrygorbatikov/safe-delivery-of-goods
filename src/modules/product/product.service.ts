import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product, ProductDocument} from "./product.schema";
import {Storage} from "../storage/storage.schema";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    public create(body: Product) {
        return new this.productModel(body).save()
    }

    public findById(_id: string){
        return this.productModel.findById(_id)
    }

    public find(){
        return this.productModel.find()
    }
}
