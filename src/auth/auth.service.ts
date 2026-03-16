import { BadGatewayException, BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import {RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService
  ){}
 
  
  async validateUser(email: string, password:string){
    console.log('email validate', email)
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new BadGatewayException('Utilisateur introuvable')
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Le mot de passe ne correspond pas');
    }
    return user
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.email, login.password);

    const payload = {
      sub: user.id,
      email: user.email,
    };
    

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException("l'email existe déjà");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
     this.usersService.create(newUser);
    return this.login(newUser);
  }
   // Stocke le token dans un cookie sécurisé
  

   
}
