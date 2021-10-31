import {ApiProperty} from "@nestjs/swagger";

export class LoginManagerBodyDto {
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