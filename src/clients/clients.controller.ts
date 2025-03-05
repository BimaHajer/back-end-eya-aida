/* eslint-disable */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterDto } from 'src/filter.dto';
import { User } from 'src/shared/shared.service';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<ClientDto>): Promise<[ClientDto[], number]> {
    return this.clientService.findClients(filter);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createClient(@Body() clientDto: ClientDto,  @User('id') idUser: number) {
    return this.clientService.createClient(clientDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  async replaceById(@Param('id') id: number, @Body() clientDto: ClientDto, @User('id') idUser: number) {
    return this.clientService.replaceById(id, clientDto, idUser);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findById(@Param('id') id: number) {
    return this.clientService.findById(id);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/deleteMultipleClient')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any, @User('id') idUser: number) {
    return this.clientService.removeMultiple(tab[0], tab[1]);
  }
}

