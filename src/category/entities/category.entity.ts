import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Categorys")

export class Category{
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: "id" })
  id:number;

  @ApiProperty()
  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @ApiProperty()
  @Column("text", { name: "description ", nullable: true })
  description : string | null;

  @ApiProperty()
  @Column("boolean", { name: "status", nullable: true, default: true })
  status: boolean | false;

  @ApiProperty()
  @Column("timestamp with time zone", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @ApiProperty()
  @Column("integer", { name: "createdBy", nullable: true })
  createdBy: number | null;

  @ApiProperty()
  @Column("timestamp with time zone", { name: "updatedAt", nullable: true })
  updatedAt: Date | null;

  @ApiProperty()
  @Column("integer", { name: "updatedBy", nullable: true })
  updatedBy: number | null;

  @ApiProperty()
  @Column("timestamp with time zone", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

@ApiProperty()
  @Column("boolean", { name: "active", nullable: true, default: true })
  active: boolean | false;

}