// import {
//     Entity,
//     BaseEntity,
//     Column,
//     PrimaryGeneratedColumn,
//     ManyToOne,
//     JoinColumn,
//     OneToMany,
// } from "typeorm";
// import { Category } from "./Category";

// @Entity("section")
// export class Section extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({
//         nullable: false,
//     })
//     title: string;

//     // relashion with Child Category
//     @OneToMany(() => Category, (Category) => Category.section)
//     categories: Category[];
// }
