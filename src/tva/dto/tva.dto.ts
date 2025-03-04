export class TvaDto {
    id:number;
    value: number | null;
    active: boolean | false;
    createdAt: Date | null;
    createdBy: number | null;
    updatedAt: Date | null;
    updatedBy: number | null;
    deletedAt: Date | null;
    saltRounds: any;
    static saltRounds: any;
    }