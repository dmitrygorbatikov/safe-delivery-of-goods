import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class CreateStorageBodyDto {
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
    address: string

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
}