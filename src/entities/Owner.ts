import { Person } from "./utils/Person";
import { Entity, Column } from "typeorm";

@Entity("owner")
export class Owner extends Person {
    @Column({
        nullable: false,
        type: "simple-array",
    })
    owner_of: string[];

    @Column({
        type: "numeric",
    })
    Maintenance_fees: number;

    @Column()
    car_plate: string;
}
