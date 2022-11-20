import { Person } from "./utils/Person";
import { Entity, Column } from "typeorm";

@Entity("worker")
export class Worker extends Person {
    @Column({
        nullable: false,
        length: 14,
    })
    id_number: string;

    @Column({
        nullable: false,
    })
    working_section: string;

    @Column()
    salary: number;

    @Column()
    start_working_data: string;

    @Column()
    finish_working_data: string;

    @Column({
        type: "boolean",
        default: true,
    })
    now_working: boolean;


    @Column({
        default: "",
    })
    reason_to_leave: string;
}
