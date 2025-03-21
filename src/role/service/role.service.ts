import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor( 
    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>, 
  ) {} 
  findRoles() {
    return this.roleRepository.find()
  }


}
