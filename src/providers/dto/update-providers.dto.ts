import { PartialType } from '@nestjs/mapped-types';
import { ProvidersDto } from './providers.dto';




export class UpdateProvidersDto extends PartialType(ProvidersDto) {}
