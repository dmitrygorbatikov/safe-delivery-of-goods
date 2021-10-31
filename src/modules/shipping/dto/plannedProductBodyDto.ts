import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class PlannedProductBodyDto {
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
    goods: Array<any>

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
}