import { ApiProperty } from "@nestjs/swagger";
import { Model } from "src/modeles/entities/model.entity";
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('brands')
export class Brand {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
  
    @ApiProperty()
    @Column('text', { name: 'name', nullable: true })
    name: string | null;
  

    @ApiProperty()
    @Column('text', { name: 'picture', nullable: true })
    picture: string | null;

    @Column('text', { name: 'description', nullable: true })
    description: string | null;
    


    @ApiProperty()
    @Column('boolean', { name: 'active', nullable: true, default: true })
    active: boolean | false;
  
   
    @ApiProperty()
    @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
    createdAt: Date | null;
  
    @ApiProperty()
    @Column('integer', { name: 'createdBy', nullable: true })
    createdBy: number | null;
  
    @ApiProperty()
    @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
    updatedAt: Date | null;
  
    @ApiProperty()
    @Column('integer', { name: 'updatedBy', nullable: true })
    updatedBy: number | null;
  
    @ApiProperty()
    @Column('timestamp with time zone', { name: 'deletedAt', nullable: true })
    deletedAt: Date | null;
    
    @ApiProperty()
    @OneToMany(() => Model, (model: Model) => model.brandId, { cascade: true })
    models: Model[] | null;
  
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
