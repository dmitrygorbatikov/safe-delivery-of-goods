import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class CreateProductBodyDto {
    @ApiProperty({
        description: 'title',
        example: 'title'
    })
    title: string

    @ApiProperty({
        description: 'weight',
        example: 56457
    })
    weight: number

    @ApiProperty({
        description: 'storageFrom',
        example: '2345ge54y2t234t6'
    })
    storageFrom: string

    @ApiProperty({
        description: 'storageTo',
        example: 'fe45yeyh56uy5u6y4'
    })
    storageTo: string
}