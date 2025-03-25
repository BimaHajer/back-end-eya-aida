import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { PaimentDto } from './paiment/dto/dto.paiment';
import { PaimentsService } from './paiments.service';

@Controller('paiments')
@ApiTags('paiments') 
export class PaimentsController {
  constructor(private readonly paimentService: PaimentsService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<PaimentDto>): Promise<[PaimentDto[], number]> {
    return this.paimentService.findPaiments(filter);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createModele(@Body() paimentDto: PaimentDto, @User('id') idUser: number) {
      return this.paimentService.createPaiment(paimentDto);
  }
  
  
   
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
@ApiBearerAuth()
async replaceById(@Param('id') id: number, @Body() paimentDto: PaimentDto, @User('id') idUser: number) {
  return this.paimentService.replaceById(id, paimentDto,);
}

@UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.paimentService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.paimentService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/deleteMultiplePaiment')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.paimentService.removeMultiple(tab[0], tab[1]);
  }


}
