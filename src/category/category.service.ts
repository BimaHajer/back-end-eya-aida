/* eslint-disable */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import {  Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@Injectable()
export class CategoryService {
 
  ProvidersDto: any;
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}
  async findCategory(filter: any): Promise<[CategoryDto[], number]> {
    const options = parseFilter(filter);

    const categoryObjectsAndCount: any = await this.CategoryRepository.findAndCount(options);

    const CategoryObjects:CategoryDto[] = [];
    const Category = categoryObjectsAndCount[0];
    for (const item of Category) {
      const {  saltRounds, ...result } = item;
      CategoryObjects.push(result);
    }
    categoryObjectsAndCount[0] = CategoryObjects;
    return await categoryObjectsAndCount;
  }

  async createCategory(CategoryDto:CategoryDto) {
     const Category = await this.CategoryRepository.create(CategoryDto);
   return this.CategoryRepository.save(Category)
  }

  async replaceById(id: number, updateCategoryDto: UpdateCategoryDto) {
let category= await this.CategoryRepository.preload({
  id:+id,
  ...updateCategoryDto
}) 

if (!category) {
  throw new NotFoundException(`Provider with ID ${id} not found`);
}
return this.CategoryRepository.save(category)

 }

  async findById(id: number): Promise<any> {
    const category: any = await this.CategoryRepository.findOne({
      where: { id: id }
    });


    return category
  }

  async remove(id: string) {
    return await this.CategoryRepository.delete(id)
  }


  async removeMultiple(toDelete: number[], toDisable: number[], idCategory?: number) {
    let resultDelete: boolean | null = null
    let resultDisable: boolean | null = null
    if (toDelete.length != 0) {
      if (await this.CategoryRepository.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
    }
    if (toDisable.length != 0) {
      if (await this.CategoryRepository.update(toDisable, { updatedBy: idCategory, updatedAt: new Date(), active: false })) {
        resultDisable = true
      } else
        resultDisable = false
    }
    if (((toDelete.length != 0 && resultDelete == true) || (toDelete.length == 0 && resultDelete == null)) &&
      ((toDisable.length != 0 && resultDisable == true) || (toDisable.length == 0 && resultDisable == null))) {
      return true
    } else
      return false
  }

  }
