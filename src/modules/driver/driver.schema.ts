import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import {ApiProperty} from "@nestjs/swagger";

export type DriverDocument = Driver & Document

@Schema()
export class Driver {
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
        example: 'driver'
    })
    @Prop()
    role: string

    @ApiProperty({
        description: 'registerDate',
        example: 235324546754
    })
    @Prop()
    registerDate: number
}

export const DriverSchema = SchemaFactory.createForClass(Driver)
