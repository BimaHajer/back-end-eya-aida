export class TransactionDto {
    name: string;
    description: string;
    amount: number;
    ban: string;
    isCompleted: boolean;
    isCredit:boolean;
    createdAt:Date;
    updatedAt:Date;
    createdBy:number;
    updatedBy:number;
    active:boolean;
    deletedAt: Date | null;

}
