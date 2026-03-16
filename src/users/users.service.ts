import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma:PrismaService
  ){}
  async findOneByEmail(email: string) {
   const user = await this.prisma.user.findUnique({
    where:{email:email}
   })
   return user
  }
  async create(createUserDto: CreateUserDto) {
   const user = await this.prisma.user.create({
      data:{...createUserDto}
    })
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
