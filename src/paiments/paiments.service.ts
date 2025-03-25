import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { ILike, Repository } from 'typeorm';
import { PaimentDto } from './paiment/dto/dto.paiment';
import { Paiment } from './paiment/entities/paiment.entity';

@Injectable()
export class PaimentsService {
  constructor(
    @InjectRepository(Paiment)
    private readonly paimentRepository: Repository<Paiment>,
  ) {}
  async findPaiments(filter: any): Promise<[PaimentDto[], number]> {
    const options = parseFilter(filter);

    const paimentsObjectsAndCount: any = await this.paimentRepository.findAndCount(options);
  
    return paimentsObjectsAndCount;
  }
  

  async createPaiment(createPaimentDto: PaimentDto) {
    const paiment = this.paimentRepository.create(createPaimentDto);
    return this.paimentRepository.save(paiment);
}



async replaceById(id: any, updatePaimentDto: PaimentDto) {
  const paiment = await this.paimentRepository.findOne({ where: { id: +id } });
  if (!paiment) {
    throw new NotFoundException(`Paiment #${id} not found!`);
  }

  const paimentPreload: any = await this.paimentRepository.preload({
    id: +id,
    ...updatePaimentDto,
    
  });
   
  return this.paimentRepository.save(paimentPreload);
}



  async findById(id: number): Promise<any> {
    const paiment: any = await this.paimentRepository.findOne({
      where: { id: id }
    });

    return paiment
  }

  async remove(id: number) {
    return await this.paimentRepository.delete(id)
  }

  async findOne(name: string): Promise<any> {
    return await this.paimentRepository.findOne({ where: { modePayment: ILike(name) } });
  }
  

  async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
    let resultDelete: boolean | null = null
    let resultDisable: boolean | null = null
    if (toDelete.length != 0) {
      if (await this.paimentRepository.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
    }
    if (toDisable.length != 0) {
      if (await this.paimentRepository.update(toDisable, { updatedBy: idUser, updatedAt: new Date(), active: false })) {
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
