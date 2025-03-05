import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { ILike, Repository } from 'typeorm';
import { BrandDto } from './dto/brand.dto';
import { Brand } from './entity/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async findBrands(filter: any): Promise<[BrandDto[], number]> {
    const options = parseFilter(filter);

    
    const brandsObjectsAndCount: any = await this.brandRepository.findAndCount(options);
    return brandsObjectsAndCount;
  }

  async createBrand(createBrandDto: BrandDto) {
    const brand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(brand);
}



async replaceById(id: any, updateBrandDto: BrandDto) {
  console.log('Mise à jour de la marque avec ID:', id); 
  const brand = await this.brandRepository.findOne({ where: { id: +id } });
  if (!brand) {
    throw new NotFoundException(`Brand #${id} not found!`);
  }

  const brandPreload: any = await this.brandRepository.preload({
    id: +id,
    ...updateBrandDto,
  });
  console.log('Marque pré-chargée avant la sauvegarde:', brandPreload); 
  return this.brandRepository.save(brandPreload);
}



  async findById(id: number): Promise<any> {
    const brand: any = await this.brandRepository.findOne({
      where: { id: id }
    });

    return brand
  }

  async remove(id: number) {
    return await this.brandRepository.delete(id)
  }

  async findOne(name: string): Promise<any> {
    return await this.brandRepository.findOne({ where: { name: ILike(name) } });
  }

  async removeMultiple(toDelete: number[], toDisable: number[], idBrand?: number) {
    let resultDelete: boolean | null = null
    let resultDisable: boolean | null = null
    if (toDelete.length != 0) {
      if (await this.brandRepository.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
    }
    if (toDisable.length != 0) {
      if (await this.brandRepository.update(toDisable, { updatedBy: idBrand, updatedAt: new Date(), active: false })) {
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
