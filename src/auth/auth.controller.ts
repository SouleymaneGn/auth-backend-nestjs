import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import * as express from 'express';
import { JwtAuthGuard } from './jwt.garde';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.garde';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
  register(@Body() createUser: CreateUserDto, @Res({ passthrough: true }) res: express.Response){
    const access_token =  this.authService.register(createUser)
    res.cookie('token', access_token, COOKIE_OPTIONS);
    
  }
   @Post('login')
   login(@Body() login: LoginDto, @Res({ passthrough: true })  res: express.Response){
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
  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req) {
      return req.user
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
