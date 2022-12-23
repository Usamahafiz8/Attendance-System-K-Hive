import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
@Controller("app")
export class AppController {
  constructor() {}
  @Get()
  getHello():String{
      return "hello welcome"
  }




}
