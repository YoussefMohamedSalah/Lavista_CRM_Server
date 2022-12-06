import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Category } from './Category';
import { QrCodeItem } from './QrcodeItem';
import { Village } from './village';

@Entity('item')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  en_item_name: string;

  @Column({
    nullable: false
  })
  ar_item_name: string;

  // relasion with Parent Village
  @ManyToOne(() => Village, (village) => village.items)
  @JoinColumn({
    name: 'village_Id'
  })
  village: Village;

  // relasion with Parent Category
  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({
    name: 'category_title'
  })
  category: Category;

  // relasion with cild Broken Items QrCodeItem
  @OneToMany(() => QrCodeItem, (qrCodeItem) => qrCodeItem.item, {
    cascade: true
  })
  qrCodeItems: QrCodeItem[];
}
