/* eslint-disable */

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<UserDto>): Promise<[UserDto[], number]> {
    return this.userService.findUsers(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createUser(@Body() userDto: UserDto, @User('id') idUser: number) {
    return this.userService.createUser(userDto,idUser);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  async replaceById(@Param('id') id: number, @Body() userDto: UserDto, @User('id') idUser: number) {
    return this.userService.replaceById(id, userDto, idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/deleteMultipleUser')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.userService.removeMultiple(tab[0], tab[1], idUser);
  }


}
