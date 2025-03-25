import { Module } from '@nestjs/common';
import { PaimentsService } from './paiments.service';
import { PaimentsController } from './paiments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paiment } from './paiment/entities/paiment.entity';

@Module({
  controllers: [PaimentsController],
  providers: [PaimentsService, PaimentsService],
  imports: [TypeOrmModule.forFeature([Paiment])], 
})
export class PaimentsModule {}
