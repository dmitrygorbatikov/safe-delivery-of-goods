import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";
import {CarIndicatorsDto} from "./dto/carIndicatorsDto";

export type CarDocument = Car & Document

@Schema()
export class Car {
    @ApiProperty({
        description: 'model',
        example: 'model'
    })
    @Prop()
    model: string

    @ApiProperty({
        description: 'carryingCapacity',
        example: 50000
    })
    @Prop()
    carryingCapacity: number

    @ApiProperty({
        description: 'driverId',
        example: '423f34t34t'
    })
    @Prop()
    driverId: string

    @ApiProperty({
        description: 'indicators',
        example: []
    })
    @Prop()
    indicators: Array<CarIndicatorsDto>

    @ApiProperty({
        description: 'price',
        example: 42342562
    })
    @Prop()
    price: string

    @ApiProperty({
        description: 'condition',
        example: 'condition'
    })
    @Prop()
    condition: string

    @ApiProperty({
        description: 'status',
        example: 'atStorage'
    })
    @Prop()
    status: string


    @ApiProperty({
        description: 'number',
        example: 'AX2932AI'
    })
    @Prop()
    number: string

    @ApiProperty({
        description: 'storageId',
        example: '2353t3t453ty3qt'
    })
    @Prop()
    storageId: string

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
        description: 'registerDate',
        example: 3453453463462346
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

export const CarSchema = SchemaFactory.createForClass(Car)
