import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity("item")
export class Item extends BaseEntity {
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

    @Column({
        nullable: true,
        default: true,
    })
    condition: boolean;

    @Column({
        type: "simple-array",
        default: [],
    })
    needs: string[];

    // relasion with Parent Category
    @ManyToOne(() => Category, (category) => category.items)
    @JoinColumn({
        name: "category_Id",
    })
    category: Category;
}
