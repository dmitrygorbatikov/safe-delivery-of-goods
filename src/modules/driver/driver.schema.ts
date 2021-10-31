import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type DriverDocument = Driver & Document

@Schema()
export class Driver {
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

export const DriverSchema = SchemaFactory.createForClass(Driver)
