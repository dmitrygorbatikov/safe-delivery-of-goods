import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";

export type StorageDocument = Storage & Document

@Schema()
export class Storage {
    @ApiProperty({
        description: 'title',
        example: 'title'
    })
    @Prop()
    title: string

    @ApiProperty({
        description: 'address',
        example: 'address'
    })
    @Prop()
    address: number

    @ApiProperty({
        description: 'indicators',
        example: []
    })
    @Prop()
    indicators: Array<any>

    @ApiProperty({
        description: 'registerDate',
        example: 53463436632453
    })
    @Prop()
    registerDate: number

    @ApiProperty({
        description: 'latitude',
        example: 46.432
    })
    @Prop()
    latitude: number

    @ApiProperty({
        description: 'longitude',
        example: 47.634
    })
    @Prop()
    longitude: number

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    managerId: string
}

export const StorageSchema = SchemaFactory.createForClass(Storage)
