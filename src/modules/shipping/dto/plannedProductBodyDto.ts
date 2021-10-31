import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";
import {ShippingGoodsDto} from "./shippingGoodsDto";

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
}