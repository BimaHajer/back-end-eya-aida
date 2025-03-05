import { Module } from '@nestjs/common';
import { ModelesService } from './modeles.service';
import { ModelesController } from './modeles.controller';
import { Model } from './entities/model.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ModelesController],
  providers: [ModelesService],
  imports: [TypeOrmModule.forFeature([Model])],
  
})
export class ModelesModule {}
