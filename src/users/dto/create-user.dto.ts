import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'


export class CreateUserDto {
 @ApiProperty({ example: 'Souleymane Bah'})
   @IsOptional()
   @IsString()
   fullName: string
 
   @ApiProperty({ example: 'user@email.com' })
   @IsNotEmpty()
   @IsEmail()
   email: string
 
   @ApiProperty({ example: '123456' })
   @IsNotEmpty()
   @MinLength(6)
   password: string  
}
