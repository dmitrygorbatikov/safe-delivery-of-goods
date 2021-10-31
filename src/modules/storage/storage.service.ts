import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Storage, StorageDocument} from "./storage.schema";
import {StorageIndicatorsDto} from "./dto/storageIndicatorsDto";

@Injectable()
export class StorageService {
    constructor(
        @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
    ) {
    }

    public create(body: Storage) {
        return new this.storageModel(body).save()
    }

    public findById(_id: string) {
        return this.storageModel.findById(_id)
    }

    public find() {
        return this.storageModel.find()
    }

    public findByManager(managerId: string) {
        return this.storageModel.find({managerId})
    }

    public updateStorageStatistic(
        _id: string,
        body: { indicators: StorageIndicatorsDto[] },
    ) {
        return this.storageModel.findByIdAndUpdate(_id, body)
    }
}
