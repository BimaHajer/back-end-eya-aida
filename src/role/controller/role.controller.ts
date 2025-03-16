import { Controller, Get,  UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

import { RoleService } from '../service/role.service';

@Controller('roles')
@ApiTags('roles') 
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @UseGuards(JwtAuthGuard) 
  @Get('/') 
  @ApiBearerAuth() 
  find() { 

    return this.roleService.findRoles(); 

  } 
}

