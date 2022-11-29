import { Person } from "./utils/Person";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Village } from "./village";

export enum UserTypes {
    user = "user",
    superManager = "super_manager",
    villageManager = "village_manager",
    qrCodeManager = "qr_code_manager",
    ownersManager = "owners_manager",
    workersManager = "workers_manager",
    gateManager = "gate_manager",
}

@Entity("user")
export class User extends Person {
    @Column()
    loggin: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserTypes,
        default: "user",
    })
    user_type: string;

    @Column({
        nullable: true,
    })
    manager_of: string;

    @Column({
        default: "la vista",
    })
    village_name: string;

    @Column({
        default: "",
        nullable: true,
    })
    profile_image: string;

    // relasion with Parent Village
    @ManyToOne(() => Village, (village) => village.users, { cascade: true })
    @JoinColumn({
        name: "village_Id",
    })
    village: Village;
}
