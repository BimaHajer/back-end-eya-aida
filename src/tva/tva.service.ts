import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tva } from './entities/tva.entity';
import { Repository } from 'typeorm';
import { TvaDto } from './dto/tva.dto';
import { parseFilter } from 'src/filter.dto';
import { UpdateTvaDto } from './dto/updateTva.dto';

@Injectable()
export class TvaService {
    
  
     
      TvaDto: any;
      constructor(
        @InjectRepository(tva)
        private readonly TvaRepository: Repository<tva>,
      ) {}
      async findTva(filter: any): Promise<[TvaDto[], number]> {
        const options = parseFilter(filter);
    
        const tvaObjectsAndCount: any = await this.TvaRepository.findAndCount(options);
    
        const TvaObjects:TvaDto[] = [];
        const Tva = tvaObjectsAndCount[0];
        for (const item of Tva) {
          const {  saltRounds, ...result } = item;
          TvaObjects.push(result);
        }
        tvaObjectsAndCount[0] = TvaObjects;
        return await tvaObjectsAndCount;
      }
    
      async createTva(TvaDto:TvaDto) {
         const tva = await this.TvaRepository.create(TvaDto);
       return this.TvaRepository.save(tva)
      }
    
      async replaceById(id: number, updateTvaDto: UpdateTvaDto) {
    let tva= await this.TvaRepository.preload({
      id:+id,
      ...updateTvaDto
    }) 
    
    if (!tva) {
      throw new NotFoundException(`tva with ID ${id} not found`);
    }
    return this.TvaRepository.save(tva)
    
     }
    
      async findById(id: number): Promise<any> {
        const tva: any = await this.TvaRepository.findOne({
          where: { id: id }
        });
    
    
        return tva
      }
    
      async remove(id: string) {
        return await this.TvaRepository.delete(id)
      }

    
      async removeMultiple(toDelete: number[], toDisable: number[], idTva?: number) {
        let resultDelete: boolean | null = null
        let resultDisable: boolean | null = null
        if (toDelete.length != 0) {
          if (await this.TvaRepository.delete(toDelete)) {
            resultDelete = true
          } else
            resultDelete = false
        }
        if (toDisable.length != 0) {
          if (await this.TvaRepository.update(toDisable, { updatedBy: idTva, updatedAt: new Date(), active: false })) {
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
    

