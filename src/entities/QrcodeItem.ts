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

  // relasion with Parent Item
  @ManyToOne(() => Item, (item) => item.qrCodeItem)
  @JoinColumn({
    name: 'item_Id'
  })
  item: Item;

  // relasion with cild BrokenItem
  @OneToMany(() => BrokenItem, (brokenItem) => brokenItem.brokenItem, {
    cascade: true
  })
  brokenItems: BrokenItem[];
}
