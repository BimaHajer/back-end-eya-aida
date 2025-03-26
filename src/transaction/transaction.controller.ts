import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { ApiBearerAuth, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { FilterDto } from 'src/filter.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/shared/shared.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
   //@UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  async createTransaction(@Body() createTransactionDto: TransactionDto, @User('id') idUser: number){
  
    return this.transactionService.createTransaction(createTransactionDto,idUser);
  }
  //@UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
  find(@Query('filter') filter?: FilterDto<TransactionDto>): Promise<[TransactionDto[], number]> {
    return this.transactionService.findTransaction(filter);
  }
   //@UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.transactionService.findById(+id);
  }
   //@UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  async replaceById(@Param('id') id: number, @Body() userDto: TransactionDto, @User('id') idUser: number) {
    return this.transactionService.replaceById(id, userDto, idUser);
  }
   //@UseGuards(JwtAuthGuard)
   @Delete('/:id')
   @ApiBearerAuth()
   remove(@Param('id') id: number) {
     return this.transactionService.remove(id);
   }
  //@UseGuards(JwtAuthGuard)
 
  @Post('/deleteMultipleTransaction')
  @ApiBearerAuth()
  removeMultiple(@Body() tab: any) {
    return this.transactionService.removeMultiple(tab[0], tab[1]);
  }
  

}

