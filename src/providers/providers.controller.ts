import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ApiBearerAuth, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { FilterDto } from 'src/filter.dto';
import { ProvidersDto } from './dto/providers.dto';

@Controller('providers')
export class ProvidersController {
     constructor(private readonly providersService: ProvidersService) {}
    
      @Get('/')
      @ApiBearerAuth()
      @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
      find(@Query('filter') filter?: FilterDto<ProvidersDto>): Promise<[ProvidersDto[], number]> {
        return this.providersService.findProviders(filter);
      }
    
      @Post('/')
      @ApiBearerAuth()
      async createProviders(@Body() providersDto: ProvidersDto) {
        return this.providersService.createProviders(providersDto);
      }
      
      @Patch('/:id')
      @ApiBearerAuth()
      async replaceById(@Param("id") id: number, @Body() providersDto: ProvidersDto) {
        return this.providersService.replaceById(id, providersDto);
      }
    
      @Get('/:id')
      @ApiBearerAuth()
      findById(@Param('id') id: number) {
        return this.providersService.findById(id);
      }
    
      @Delete('/:id')
      @ApiBearerAuth()
      remove(@Param('id') id: string) {
        return this.providersService.remove(id);
      }
    
      @Post('/deleteMultipleProviders')
      @ApiBearerAuth()
      removeMultiple(@Body() tab: any) {
        return this.providersService.removeMultiple(tab[0], tab[1]);
      }
    
}
