import { Person } from "./utils/Person";
import { Entity, Column } from "typeorm";

export enum UserTypes {
    superManager = "super_manager",
    villageManager = "village_manager",
    user = "user",
}

export enum PrivilegesTypes {
    qrCodeManager = "super_manager",
    financeManager = "village_manager",
    all = "all",
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
}
