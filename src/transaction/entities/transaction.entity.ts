
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class Transaction {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty()
    @Column( 'text',{name:"name", nullable:true})
    name: string;
    @ApiProperty()
    @Column('text',{name:"description",nullable:true})
    description: string;
    @ApiProperty()
    @Column('decimal',{name:"amount",nullable:true})
    amount: number;
    @ApiProperty()
    @Column('text',{name:"ban",nullable:true})
    ban: string;
    @ApiProperty()
    @Column('text',{name:"isCompleted",nullable:true})
    isCompleted: boolean;
    @ApiProperty()
    @Column('text',{name:"isCredit",nullable:true})
    isCredit:boolean;
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
    @Column('boolean',{name:"active",nullable:true})
    active:boolean;   
    @BeforeInsert()
    CreateATDate(): void{
       this.createdAt=new Date()
    }
    @BeforeUpdate()
    updateATDate() :void{
       this.updatedAt= new Date()
    }
    @BeforeRemove()
    eventDeletedAt() {
      this.deletedAt = new Date();
    }
}
