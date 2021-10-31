import {ApiProperty} from "@nestjs/swagger";

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
        description: 'storageId',
        example: 'fe45yeyh56uy5u6y4'
    })
    storageId: string
}