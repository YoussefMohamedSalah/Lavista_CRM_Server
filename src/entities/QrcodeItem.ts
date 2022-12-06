import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { BrokenItem } from './BrokenItem';
import { Item } from './Item';

@Entity('qrcode_item')
export class QrCodeItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  serial: string;

  @Column({
    nullable: true
  })
  image: string;

  @Column({
    type: 'boolean',
    default: true
  })
  item_state: boolean;

  @Column({
    nullable: false
  })
  category_name: string;

  @Column({
    nullable: false
  })
  village_name: string;

  // relasion with Parent Item
  @ManyToOne(() => Item, (item) => item.qrCodeItems)
  @JoinColumn({
    name: 'item_title'
  })
  item: Item;

  // relasion with cild BrokenItem
  @OneToMany(() => BrokenItem, (brokenItem) => brokenItem.brokenItem, {
    cascade: true
  })
  brokenItems: BrokenItem[];
}
