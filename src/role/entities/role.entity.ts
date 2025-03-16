import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles") 
export class Role 
{
  @ApiProperty() 

  @PrimaryGeneratedColumn({ name: "id" }) 

  id: number 

 

  @ApiProperty() 

  @Column("text", { name: "name", nullable: true }) 

  name: string | null; 

  @Column('text', { name: 'level', nullable: true })
    level: string | null;

 
    @ApiProperty() 
  @OneToMany(( )=> User, (user: User) => user.roleId)
  users : User [] | null; 

  @ApiProperty()
  @Column("boolean", { name: "active", nullable: true, default: true }) 
  active: boolean | false; 

 

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

  @BeforeInsert() 

  eventCreatedAt() { 

    this.createdAt = new Date(); 

  } 

  @BeforeUpdate() 

  eventUpdatedAt() { 

    this.updatedAt = new Date(); 

  } 

  @BeforeRemove() 

  eventDeletedAt() { 

    this.deletedAt = new Date(); 

  } 

} 

