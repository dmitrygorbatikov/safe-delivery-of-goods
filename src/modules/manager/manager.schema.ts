import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ManagerDocument = Manager & Document

@Schema()
export class Manager {
    @Prop()
    name: string

    @Prop()
    surname: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    role: string

    @Prop()
    registerDate: number
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)
