import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as express from 'express';
import { JwtAuthGuard } from './jwt.garde';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.garde';

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(@Body() register: RegisterDto, @Res({ passthrough: true }) res: express.Response){
    const access_token =  this.authService.register(register)
    res.cookie('token', access_token, COOKIE_OPTIONS);
    
  }
   @Post('login')
   login(@Body() login: LoginDto,  res: express.Response){
    console.log("email controleur", login.password)
  return this.authService.login(login); // <-- await ici
    // res.cookie('token', access_token, COOKIE_OPTIONS);
    // return access_token

  }

  @Get("private")
   @UseGuards(AuthGuard)
  testePrivate(){
    return "private"
  }
    @Get("public")
  testePublic(){
    return "public"
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
