import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";

export type ManagerDocument = Manager & Document

@Schema()
export class Manager {
    @ApiProperty({
        description: 'name',
        example: 'name'
    })
    @Prop()
    name: string

    @ApiProperty({
        description: 'surname',
        example: 'surname'
    })
    @Prop()
    surname: string

    @ApiProperty({
        description: 'email',
        example: 'email@gmail.com'
    })
    @Prop()
    email: string

    @ApiProperty({
        description: 'password',
        example: 'qweqweasdasd'
    })
    @Prop()
    password: string

    @ApiProperty({
        description: 'role',
        example: 'manager'
    })
    @Prop()
    role: string

    @ApiProperty({
        description: 'registerDate',
        example: 21423623573467
    })
    @Prop()
    registerDate: number
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)
