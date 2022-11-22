import { Person } from "./utils/Person";
import { Entity, Column, OneToMany } from "typeorm";
import { MaintenanceTransaction } from "./maintenance/Maintenance_transaction";

@Entity("owner")
export class Owner extends Person {
    @Column({
        nullable: false,
    })
    owner_of: string;

    @Column({
        type: "numeric",
    })
    maintenance_fees: number;

    @Column()
    car_plate: string;

    @Column()
    status: string;

    // one to many with Transactions
    @OneToMany(
        () => MaintenanceTransaction,
        (maintenanceTransaction) => maintenanceTransaction.owner
    )
    maintenanceTransaction: MaintenanceTransaction[];
}
