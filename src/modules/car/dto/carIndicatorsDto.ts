import {ApiProperty} from "@nestjs/swagger";

export class CarIndicatorsDto {
    @ApiProperty({
        description: 'engineHeating',
        example: 280
    })
    engineHeating: number

    @ApiProperty({
        description: 'inflationOfTires',
        example: 100
    })
    inflationOfTires: number

    @ApiProperty({
        description: '',
        example: 100
    })
    tightnessOfBolts: number

    @ApiProperty({
        description: 'measurementDate',
        example: 23542353426326346
    })
    measurementDate: number
}