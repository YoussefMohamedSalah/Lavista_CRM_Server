import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Owner } from "../Owner";

export enum PaymentMethod {
    VISA = "visa",
    CASH = "cash",
    CHECK = "check",
}

@Entity("maintenance_transaction")
export class MaintenanceTransaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: PaymentMethod,
    })
    type: string;

    @Column({
        type: "numeric",
    })
    amount: number;

    // one to many with Owner
    @ManyToOne(() => Owner, (owner) => owner.maintenanceTransaction, {
        cascade: true,
    })
    @JoinColumn({
        name: "owner_id",
    })
    owner: Owner;
}
