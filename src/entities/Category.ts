import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Item } from './Item';
import { Village } from './village';
// import { Section } from "./Section";

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  title: string;

  @Column({
    nullable: false
  })
  shortcut: string;

  @Column({
    nullable: false
  })
  items_count: number;

  @Column({
    nullable: false
  })
  under_repair_items_count: number;

  @Column()
  village_id: string;

  // relasion with cild Item
  @OneToMany(() => Item, (item) => item.category, { cascade: true })
  items: Item[];

  // relasion with Parent Village
  @ManyToOne(() => Village, (village) => village.categories)
  @JoinColumn({
    name: 'village_Id'
  })
  village: Village;
}
