import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entity/brand.entity';

@Module({
  controllers: [BrandController],
  providers: [BrandsService],
  imports: [TypeOrmModule.forFeature([Brand])],
})
export class BrandsModule {}
