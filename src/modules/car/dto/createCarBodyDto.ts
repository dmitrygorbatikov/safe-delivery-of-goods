import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class CreateCarBodyDto {
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
        description: 'price',
        example: 42342562
    })
    @Prop()
    price: string

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
}