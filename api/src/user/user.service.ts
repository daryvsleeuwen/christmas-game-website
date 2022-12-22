import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameSettingsDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async updateSettings(authUser: UserDto, gameSettings: GameSettingsDto){
        const user = await this.prisma.user.update({
            where: {
                id: authUser.id
            },
            data: {
                gameSettings: {
                    update: {
                        roundDuration: gameSettings.roundDuration
                    }
                }
            },
            include: {
                gameSettings: true
            }
        })
    
        if(!user) return { error:'We could not find a user' };
        return user.gameSettings
    }
}
