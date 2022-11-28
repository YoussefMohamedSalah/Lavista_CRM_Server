import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Item } from "../Item";

@Entity("broken_items")
export class BrokenItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    label: string;

    // relasion with Parent Item
    @ManyToOne(() => Item, (item) => item.brokenItems, {cascade : true})
    @JoinColumn({
        name: "item_id",
    })
    item_id: Item;
}
