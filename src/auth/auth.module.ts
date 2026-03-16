import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    
        JwtModule.registerAsync({
      inject: [ConfigService],
 useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // ici on est sûr que secret existe
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    ],
})
export class AuthModule {}
