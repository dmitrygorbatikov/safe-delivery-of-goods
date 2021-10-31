import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ShippingDocument = Shipping & Document

@Schema()
export class Shipping {
    @Prop()
    status: string

    @Prop()
    driverId: number

    @Prop()
    carId: string

    @Prop()
    goods: Array<any>

    @Prop()
    storageFrom: string

    @Prop()
    storageTo: string

    @Prop()
    dispatchTime: string

    @Prop()
    arrivalTime: string

    @Prop()
    registerDate: number
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping)
