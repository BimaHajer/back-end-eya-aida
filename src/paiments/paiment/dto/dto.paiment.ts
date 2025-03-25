import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class PaimentDto {
    
  @ApiProperty()
  readonly modPayment?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  readonly active?: boolean;

  createdBy?: number;
}
