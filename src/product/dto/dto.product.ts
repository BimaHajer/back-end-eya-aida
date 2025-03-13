import { ApiProperty } from "@nestjs/swagger";

 

 

export class ProductDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly tva: number;

  @ApiProperty()
  readonly priceTTC: number;

  @ApiProperty()
  readonly priceHT: number;

  @ApiProperty()
  readonly initialQuantity: number;

  @ApiProperty()
  readonly remainingQuantity: number;

  @ApiProperty()
  picture?: string;

  @ApiProperty()
  readonly categoryId: number;
  
  @ApiProperty()
  readonly modelId: number;


  createdBy?: number;
}
