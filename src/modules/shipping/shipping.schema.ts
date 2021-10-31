import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";
import {ShippingGoodsDto} from "./dto/shippingGoodsDto";

export type ShippingDocument = Shipping & Document

@Schema()
export class Shipping {
    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    status: string

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    driverId: string

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    carId: string

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    goods: Array<ShippingGoodsDto>

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    storageFrom: string

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    storageTo: string

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    dispatchTime: number

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
    })
    @Prop()
    arrivalTime: number

    @ApiProperty({
        description: 'managerId',
        example: '23452ttfe3653tegf3'
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

export const ShippingSchema = SchemaFactory.createForClass(Shipping)
