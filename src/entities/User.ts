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
    @Column({
        type: "enum",
        enum: UserTypes,
        default: "user",
    })
    user_type: string;

    @Column()
    manager_of: string;

    @Column({
        type: "enum",
        enum: PrivilegesTypes,
    })
    privilege_type: string;
}
