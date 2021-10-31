import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @ApiProperty({
        description: 'title',
        example: 'title'
    })
    @Prop()
    title: string

    @ApiProperty({
        description: 'weight',
        example: 56457
    })
    @Prop()
    weight: number

    @ApiProperty({
        description: 'storageId',
        example: 'fe45yeyh56uy5u6y4'
    })
    @Prop()
    storageId: string

    @ApiProperty({
        description: 'carId',
        example: '364g45yw34ty3wy74785'
    })
    @Prop()
    carId: string

    @ApiProperty({
        description: 'registerDate',
        example: 3463463467437478
    })
    @Prop()
    registerDate: number

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    managerId: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)
