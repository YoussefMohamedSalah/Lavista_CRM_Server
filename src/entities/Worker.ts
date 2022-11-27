import { Person } from "./utils/Person";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Village } from "./village";

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

    // relasion with Parent Village
    @ManyToOne(() => Village, (village) => village.workers)
    @JoinColumn({
        name: "village_Id",
    })
    village: Village;
}
