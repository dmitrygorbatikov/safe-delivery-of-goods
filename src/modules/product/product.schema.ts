import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop()
    title: string

    @Prop()
    weight: number

    @Prop()
    storageFrom: string

    @Prop()
    storageTo: string

    @Prop()
    storageId: string

    @Prop()
    carId: string

    @Prop()
    registerDate: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
