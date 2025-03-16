import { ApiProperty } from "@nestjs/swagger";
export class RoleDto {
  @ApiProperty()
  readonly name: string;
 @ApiProperty()
  readonly level: string;
  createdBy?: number;
}
