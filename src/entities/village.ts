import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("village")
export class Village extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    village_name: string;

}
