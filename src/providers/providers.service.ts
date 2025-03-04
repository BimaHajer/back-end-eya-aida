/* eslint-disable */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { ILike, Repository } from 'typeorm';
import { Providers } from './entities/providers.entity';
import { ProvidersDto } from './dto/providers.dto';
import { UpdateProvidersDto } from './dto/update-providers.dto';
@Injectable()
export class ProvidersService {
 
  ProvidersDto: any;
  constructor(
    @InjectRepository(Providers)
    private readonly ProvidersRepository: Repository<Providers>,
  ) {}
  async findProviders(filter: any): Promise<[ProvidersDto[], number]> {
    const options = parseFilter(filter);

    const providersObjectsAndCount: any = await this.ProvidersRepository.findAndCount(options);

    const ProvidersObjects:ProvidersDto[] = [];
    const Providers = providersObjectsAndCount[0];
    for (const item of Providers) {
      const {  saltRounds, ...result } = item;
      ProvidersObjects.push(result);
    }
    providersObjectsAndCount[0] = ProvidersObjects;
    return await providersObjectsAndCount;
  }



  async createProviders(createProvidersDto: ProvidersDto) {
    const bcrypt = require('bcrypt');
    const salt = 10;
    const saltRound = await bcrypt.genSalt(salt);
    createProvidersDto.saltRounds = saltRound
    const providers = await this.ProvidersRepository.create(createProvidersDto);
    const {saltRounds,  ...result } = await this.ProvidersRepository.save(providers)
      .catch((e) => {
        if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
          throw new BadRequestException(
            ' Le compte avec cette adresse e-mail existe déjà.'
          );
        }
        return e
      })
    return result
  }

  async replaceById(id: number, updateProvidersDto: UpdateProvidersDto) {

let providers= await this.ProvidersRepository.preload({
  id:+id,
  ...updateProvidersDto
}) 

if (!providers) {
  throw new NotFoundException(`Provider with ID ${id} not found`);
}
return this.ProvidersRepository.save(providers)

 }

  async findById(id: number): Promise<any> {
    const providers: any = await this.ProvidersRepository.findOne({
      where: { id: id }
    });


    return providers
  }

  async remove(id: string) {
    return await this.ProvidersRepository.delete(id)
  }

  async findOne(email: string): Promise<any> {
    return await this.ProvidersRepository.findOne({ where: { email: ILike(email) } });
  }

  async removeMultiple(toDelete: number[], toDisable: number[], idProviders?: number) {
    let resultDelete: boolean | null = null
    let resultDisable: boolean | null = null
    if (toDelete.length != 0) {
      if (await this.ProvidersRepository.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
    }
    if (toDisable.length != 0) {
      if (await this.ProvidersRepository.update(toDisable, { updatedBy: idProviders, updatedAt: new Date(), active: false })) {
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
