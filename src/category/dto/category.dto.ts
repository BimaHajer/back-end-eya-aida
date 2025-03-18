export class CategoryDto {
    id:number;
    name: string | null;
    description : string | null;
    createdAt: Date | null;
    createdBy: number | null;
    updatedAt: Date | null;
    updatedBy: number | null;
    deletedAt: Date | null;
    saltRounds: any;
    static saltRounds: any;
  
    }