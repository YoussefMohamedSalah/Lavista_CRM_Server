import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";

@Entity("category")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    shortcut: string;

//     // relasion with Parent Section
//     @ManyToOne(() => Section, (section) => section.categories)
//     @JoinColumn({
//         name: "section_Id",
//     })
//     section: Section;

//     // relasion with cild Item
//     @OneToMany(() => Item, (item) => item.category)
//     items: Item[];
}
