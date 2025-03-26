import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { FilterDto, parseFilter } from 'src/filter.dto';
@Injectable()
export class TransactionService {
  findTransaction(filter: FilterDto<TransactionDto> | undefined): Promise<[TransactionDto[], number]> {
    throw new Error('Method not implemented.');
  }
  constructor(   
    @InjectRepository(Transaction)
    private transactionResposity:Repository<Transaction>,
  ){}
  async findTransactions(filter: any): Promise<[Transaction[], number]> {
    const options = parseFilter(filter);
    const transactionObjectsAndCount: any = await this.transactionResposity.findAndCount(options);
    return transactionObjectsAndCount;
  }

      async createTransaction(createTransactionDto: TransactionDto , idUser: number) {
          createTransactionDto.createdBy = idUser;
          const transaction = await this.transactionResposity.create(createTransactionDto);
        return await this.transactionResposity.save(transaction).catch((e) => {
          throw new BadRequestException(
          "Une erreur s'est produite lors de la création de la transaction",
          );
        });
      }
       
      async replaceById(id: any, updateTransactionDto: TransactionDto, idUser) {
        const transaction = await this.transactionResposity.findOne({where: {id: +id}})
        if (!transaction) {
          throw new NotFoundException(`Transaction #${id} not found !`);
        }
        const transactionPreload:any = await this.transactionResposity.preload({
          id: +id,
          ...updateTransactionDto,
          updatedBy: idUser,
          updatedAt: new Date()
        })
          if (!transaction) {
            throw new BadRequestException(
              "Une erreur s'est produite lors de la mise à jour de transaction."
            );
          }
        
          return await this. transactionResposity.save(transactionPreload);

      }
    
      async findById(id: number): Promise<any> {
        const transaction: any = await this.transactionResposity.findOne({
          where: { id: id }
        });
    
    
        return transaction
      }
    
      async remove(id: number) {
        return await this.transactionResposity.delete(id)
      }
  
    
      async removeMultiple(toDelete: number[], toDisable: number[], idUser?: number) {
        let resultDelete: boolean | null = null
        let resultDisable: boolean | null = null
        if (toDelete.length != 0) {
          if (await this.transactionResposity.delete(toDelete)) {
            resultDelete = true
          } else
            resultDelete = false
        }
        if (toDisable.length != 0) {
          if (await this.transactionResposity.update(toDisable, { updatedBy: idUser, updatedAt: new Date(), active: false })) {
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



    