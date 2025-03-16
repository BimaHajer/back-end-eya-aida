import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { FilterDto } from 'src/filter.dto';
import { TvaDto } from './dto/tva.dto';
import { TvaService } from './tva.service';

@Controller('tva')
export class TvaController {
	constructor(private readonly tvaService: TvaService) {}

	@Get('/')
	@ApiBearerAuth()
	@ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
	find(@Query('filter') filter?: FilterDto<TvaDto>): Promise<[TvaDto[], number]> {
		return this.tvaService.findTva(filter);
	}

	@Post('/')
	@ApiBearerAuth()
	async createTva(@Body() tvaDto: TvaDto) {
		return this.tvaService.createTva(tvaDto);
	}

	@Patch('/:id')
	@ApiBearerAuth()
	async replaceById(@Param("id") id: number, @Body() tvaDto: TvaDto) {
		return this.tvaService.replaceById(id, tvaDto);
	}

	@Get('/:id')
	@ApiBearerAuth()
	findById(@Param('id') id: number) {
		return this.tvaService.findById(id);
	}

	@Delete('/:id')
	@ApiBearerAuth()
	remove(@Param('id') id: string) {
		return this.tvaService.remove(id);
	}

	@Post('/deleteMultipleTva')
	@ApiBearerAuth()
	removeMultiple(@Body() tab: any) {
		return this.tvaService.removeMultiple(tab[0], tab[1]);
	}
}
