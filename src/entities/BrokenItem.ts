import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { QrCodeItem } from './QrcodeItem';

@Entity('broken_item')
export class BrokenItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'boolean',
    default: true
  })
  state: string;

  // relasion with Parent Item
  @ManyToOne(() => QrCodeItem, (qrcodeItem) => qrcodeItem.brokenItems)
  @JoinColumn({
    name: 'qrcode_Id'
  })
  brokenItem: BrokenItem;
}
