import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Category } from './Category';
import { Item } from './Item';
import { MaintenanceTransaction } from './maintenance/Maintenance_transaction';
import { Owner } from './Owner';
import { QrCodeItem } from './QrcodeItem';
import { User } from './User';
import { Worker } from './Worker';

@Entity('village')
export class Village extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false
  })
  village_name: string;

  // relasion with cild owner
  @OneToMany(() => Owner, (owner) => owner.village, { cascade: true })
  owners: Owner[];

  // relasion with cild User
  @OneToMany(() => User, (user) => user.village, { cascade: true })
  users: User[];

  // relasion with cild Worker
  @OneToMany(() => Worker, (worker) => worker.village, { cascade: true })
  workers: Worker[];

  // relasion with cild Category
  @OneToMany(() => Category, (category) => category.village, { cascade: true })
  categories: Category[];

  // relasion with cild Item
  @OneToMany(() => Item, (item) => item.village, { cascade: true })
  items: Item[];

  // relasion with cild Transactions
  @OneToMany(
    () => MaintenanceTransaction,
    (maintenanceTransaction) => maintenanceTransaction.village,
    { cascade: true }
  )
  maintenanceTransactions: MaintenanceTransaction[];

  // // relasion with cild Qrcode Items
  // @OneToMany(() => QrCodeItem, (qrCodeItem) => qrCodeItem.village, {
  //   cascade: true
  // })
  // qrCodeItems: QrCodeItem[];
}
