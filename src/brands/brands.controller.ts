import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { BrandsService } from './brands.service';
import { BrandDto } from './dto/brand.dto';

@Controller('brands')
@ApiTags('brands')
export class BrandController {

  constructor(private readonly brandService: BrandsService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<BrandDto>): Promise<[BrandDto[], number]> {
    return this.brandService.findBrands(filter);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createBrand(@Body() brandDto: BrandDto, @User('id') idUser: number) {
      return this.brandService.createBrand(brandDto);
  }
  
  
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
@ApiBearerAuth()
async replaceById(@Param('id') id: number, @Body() brandDto: BrandDto, @User('id') idUser: number) {
  return this.brandService.replaceById(id, brandDto);
}

@UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.brandService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.brandService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/deleteMultipleBrand')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.brandService.removeMultiple(tab[0], tab[1]);
  }
}
