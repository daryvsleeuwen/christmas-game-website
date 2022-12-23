import { IsNotEmpty, IsString } from "class-validator"

export class NewGameDto {
    accessToken: string
    
    @IsString()
    @IsNotEmpty()
    clientIp: string
}

export class ClientIpDto{
    clientIp: string
}