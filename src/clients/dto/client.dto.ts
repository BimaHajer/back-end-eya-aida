import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ClientDto {
    @ApiProperty()
    @IsEmail()
    readonly email?: string;
  
    @ApiProperty()
    readonly firstName?: string;
  
    @ApiProperty()
    readonly lastName?: string;
  
    @ApiProperty()
    readonly phone?: string;
  
    @ApiProperty()
    readonly active?: boolean;
    
    @ApiProperty()
    readonly address?: string;
  
    @ApiProperty()
    readonly zipCode?: string;

    createdBy: number;
}