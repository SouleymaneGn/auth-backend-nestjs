import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {

    id : number
    @ApiProperty()
    fullName?: string
    @ApiProperty()
    email : string
    @ApiProperty()
    password : string    
}