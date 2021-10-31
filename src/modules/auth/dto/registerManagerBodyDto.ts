import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class RegisterManagerBodyDto {
    @ApiProperty({
        description: 'name',
        example: 'name'
    })
    name: string
    @ApiProperty({
        description: 'surname',
        example: 'surname'
    })
    surname: string
    @ApiProperty({
        description: 'email',
        example: 'email@gmail.com'
    })
    email: string
    @ApiProperty({
        description: 'password',
        example: 'qweqweasdasd'
    })
    password: string
}