/* eslint-disable */

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { ModeleDto } from './dto/dto.modele';
import { ModelesService } from './modeles.service';

@Controller('modeles')
@ApiTags('modeles')
export class ModelesController {
  constructor(private readonly modeleService: ModelesService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<ModeleDto>): Promise<[ModeleDto[], number]> {
    return this.modeleService.findModeles(filter);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createModele(@Body() modeleDto: ModeleDto, @User('id') idUser: number) {
      return this.modeleService.createModele(modeleDto);
  }
  
  
   
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
@ApiBearerAuth()
async replaceById(@Param('id') id: number, @Body() modeleDto: ModeleDto, @User('id') idUser: number) {
  return this.modeleService.replaceById(id, modeleDto,);
}

@UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.modeleService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.modeleService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/deleteMultipleModele')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.modeleService.removeMultiple(tab[0], tab[1]);
  }
}
