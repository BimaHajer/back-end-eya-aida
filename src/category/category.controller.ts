import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { FilterDto } from 'src/filter.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('categorys')
export class CategoryController {

         constructor(private readonly categoryService: CategoryService) {}
        
          @Get('/')
          @ApiBearerAuth()
          @ApiQuery({ name: 'filter', type: 'object', schema: { $ref: getSchemaPath(FilterDto) } })
          find(@Query('filter') filter?: FilterDto<CategoryDto>): Promise<[CategoryDto[], number]> {
            return this.categoryService.findCategory(filter);
          }
        
          @Post('/')
          @ApiBearerAuth()
          async createCategory(@Body() categoryDto: CategoryDto) {
           
            return this.categoryService.createCategory(categoryDto);
          }
          
          @Patch('/:id')
          @ApiBearerAuth()
          async replaceById(@Param("id") id: number, @Body() categoryDto: CategoryDto) {
            return this.categoryService.replaceById(id, categoryDto);
          }
        
          @Get('/:id')
          @ApiBearerAuth()
          findById(@Param('id') id: number) {
            return this.categoryService.findById(id);
          }
        
          @Delete('/:id')
          @ApiBearerAuth()
          remove(@Param('id') id: string) {
            return this.categoryService.remove(id);
          }
        
          @Post('/deleteMultipleCategory')
          @ApiBearerAuth()
          removeMultiple(@Body() tab: any) {
            return this.categoryService.removeMultiple(tab[0], tab[1]);
          }
        
    }
    
