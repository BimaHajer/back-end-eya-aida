import { PartialType } from '@nestjs/mapped-types';
import { TvaDto } from './tva.dto';





export class UpdateTvaDto extends PartialType(TvaDto) {}
