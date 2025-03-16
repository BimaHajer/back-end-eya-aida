import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controller/role.controller';
import { Role } from './entities/role.entity';
import { RoleService } from './service/role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports:[TypeOrmModule.forFeature([Role])]
})
export class RoleModule {}
