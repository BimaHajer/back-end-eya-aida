import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class BrandDto {
    
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  picture?: string;

  @ApiProperty()
  readonly active?: boolean;
}
