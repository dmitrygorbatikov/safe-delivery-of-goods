import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CarDocument = Car & Document

@Schema()
export class Car {
    @Prop()
    model: string

    @Prop()
    carryingCapacity: number

    @Prop()
    driverId: string

    @Prop()
    indicators: Array<any>

    @Prop()
    price: string

    @Prop()
    condition: string

    @Prop()
    number: string

    @Prop()
    storageId: string

    @Prop()
    registerDate: number
}

export const CarSchema = SchemaFactory.createForClass(Car)
