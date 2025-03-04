export class ProvidersDto {
    id:number;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    address: string | null;
    zipCode: string | null;
    active: boolean | false;
    createdAt: Date | null;
    createdBy: number | null;
    updatedAt: Date | null;
    updatedBy: number | null;
    deletedAt: Date | null;
    saltRounds: any;
    static saltRounds: any;
    }