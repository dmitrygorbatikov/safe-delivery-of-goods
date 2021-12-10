import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Manager, ManagerDocument} from "./manager.schema";
import {RolesEnum} from "../../enums/enums";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
        private authService: AuthService
    ) {}

    public create(body: Manager) {
        return new this.managerModel(body).save()
    }

    public findById(_id: string){
        return this.managerModel.findById(_id)
    }

    public findByEmail(email: string){
        return this.managerModel.findOne({email})
    }

    public checkManagerRole(token: string) {
        const decodeToken = this.authService.decodeToken(token)
        const { role, id } = decodeToken
        if (role !== RolesEnum.manager) {
            return false
        }
        return this.findById(id);
    }
    public checkManagerRoleAndId(token: string) {
        const decodeToken = this.authService.decodeToken(token)
        const { role, id } = decodeToken
        if (role !== RolesEnum.manager) {
            return false
        }
        return id
    }

    public findByIdAndUpdateManager(body: any, id: string) {
        return this.managerModel.findByIdAndUpdate(id, body)
    }
}
