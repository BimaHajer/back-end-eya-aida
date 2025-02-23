/* eslint-disable */
import { SharedService } from './shared.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller()
export class SharedController {
    constructor(private sharedService: SharedService){}

  @UseGuards(JwtAuthGuard)
  @Post('/uploadImgCloudinary')
  @ApiBearerAuth()
  uploadImgCloudinary(@Body() imageDto: any) {
    return this.sharedService.uploadImgCloudinary(imageDto);
  }
}
