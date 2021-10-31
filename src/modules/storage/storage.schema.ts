import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StorageDocument = Storage & Document

@Schema()
export class Storage {
    @Prop()
    title: string

    @Prop()
    address: number

    @Prop()
    indicators: Array<any>

    @Prop()
    registerDate: number

}

export const StorageSchema = SchemaFactory.createForClass(Storage)
