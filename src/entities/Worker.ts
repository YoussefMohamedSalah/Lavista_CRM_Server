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

    @Column({
        nullable: true,
    })
    finish_working_data: string;

    @Column({
        type: "boolean",
        default: true,
    })
    now_working: boolean;

    @Column({
        type: "boolean",
        nullable: true,
        default: false,
    })
    has_permission: boolean;

    @Column({
        nullable: true,
    })
    permission_type: string;

    @Column({
        nullable: true,
    })
    reason_to_leave: string;

    // relasion with Parent Village
    @ManyToOne(() => Village, (village) => village.workers, { cascade: true })
    @JoinColumn({
        name: "village_Id",
    })
    village: Village;
}
