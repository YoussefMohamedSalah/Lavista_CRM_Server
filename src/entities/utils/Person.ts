import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("person")
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({
        nullable: false,
    })
    first_name: string;

    @Column({
        nullable: false,
    })
    last_name: string;

    @Column({
        nullable: true,
    })
    phone_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
