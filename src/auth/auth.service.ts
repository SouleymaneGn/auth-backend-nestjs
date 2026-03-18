import { BadGatewayException, BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService
  ){}
 
  
  async validateUser(email: string, password:string){
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
      fullName : user.fullName,
      email: user.email,
    };
    

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUser:CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(createUser.email);
    if (existingUser) {
      throw new BadRequestException("l'email existe déjà");
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    const newUser = { ...createUser, password: hashedPassword };
    return this.usersService.create(newUser);
   // return this.login(newUser);
  }
   // Stocke le token dans un cookie sécurisé
  

   
}
