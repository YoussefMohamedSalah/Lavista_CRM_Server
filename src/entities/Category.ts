import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Item } from "./Item";
// import { Section } from "./Section";

@Entity("category")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: "Maintenance",
    })
    section: string;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    shortcut: string;

    // relasion with cild Item
    @OneToMany(() => Item, (item) => item.category)
    items: Item[];
}
