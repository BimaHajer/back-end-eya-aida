import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseFilter } from 'src/filter.dto';
import { ILike, Repository } from 'typeorm';
import { ClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async findClients(filter: any): Promise<[ClientDto[], number]> {
    const options = parseFilter(filter);

    const clientsObjectsAndCount: any = await this.clientRepository.findAndCount(options);

    return clientsObjectsAndCount;
  }

  async createClient(createClientDto: ClientDto) {
    // createClientDto.createdBy = idClient
    const client = await this.clientRepository.create(createClientDto);
    const result = await this.clientRepository.save(client)
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

  async replaceById(id: any, updateClientDto: ClientDto, idUser) {
    const client = await this.clientRepository.findOne({where: {id: +id}})
    if (!client) {
      throw new NotFoundException(`Client #${id} not found !`);
    }
    
    const clientPreload:any = await this.clientRepository.preload({
      id: +id,
      ...updateClientDto,
       updatedBy: idUser,
       updatedAt: new Date()
    });
    const result = await this.clientRepository.save(clientPreload).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          ' Le compte avec cette adresse e-mail existe déjà.'
        );
      }
      return e
    })
    return result
  }

  async findById(id: number): Promise<any> {
    const client: any = await this.clientRepository.findOne({
      where: { id: id }
    });

    return client
  }

  async remove(id: string) {
    return await this.clientRepository.delete(id)
  }

  async findOne(email: string): Promise<any> {
    return await this.clientRepository.findOne({ where: { email: ILike(email) } });
  }

  async removeMultiple(toDelete: number[], toDisable: number[], idClient?: number) {
    let resultDelete: boolean | null = null
    let resultDisable: boolean | null = null
    if (toDelete.length != 0) {
      if (await this.clientRepository.delete(toDelete)) {
        resultDelete = true
      } else
        resultDelete = false
    }
    if (toDisable.length != 0) {
      if (await this.clientRepository.update(toDisable, { updatedBy: idClient, updatedAt: new Date(), active: false })) {
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
