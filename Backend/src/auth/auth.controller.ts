import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from 'src/admin/admin.entity';


@Controller("auth")
export class AuthController {
  constructor(private jwtservice : JwtService){

  }

  
  @Post("/login")
  @UseGuards(AuthGuard("local"))
  getHello(@Req() req) {
   //jwt token
  const admin :Admin = req.admin;
  const payload = {
    username : "Osma",//admin.Username,
    password :  "Osama" //admin.password,
  };
  //console.log(req.admin);
  return {token : this.jwtservice.sign(payload)};
  }

  // @Post()
  // @UseGuards(AuthGuard("local"))
  // getHello():String{
  //     return "hello welcome"
  // }
  // console.log(req.admin);
}
