import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Manager, ManagerDocument} from "./manager.schema";

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
    ) {}
}
