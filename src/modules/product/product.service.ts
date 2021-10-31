import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product, ProductDocument} from "./product.schema";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {
    }

    public create(body: Product) {
        return new this.productModel(body).save()
    }

    public findById(_id: string) {
        return this.productModel.findById(_id)
    }

    public findByStorageId(storageId: string) {
        return this.productModel.find({storageId})
    }

    public findByManager(managerId: string) {
        return this.productModel.find({managerId})
    }

    public deleteProductById(id: string) {
        return this.productModel.findByIdAndDelete(id)
    }

}
