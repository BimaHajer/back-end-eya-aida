import { Module } from '@nestjs/common';
import { TvaController } from './tva.controller';
import { TvaService } from './tva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tva } from './entities/tva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tva])],
  controllers: [TvaController],
  providers: [TvaService]
})
export class TvaModule {}
