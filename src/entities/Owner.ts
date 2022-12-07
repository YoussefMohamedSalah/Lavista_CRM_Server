import { Person } from './utils/Person';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MaintenanceTransaction } from './maintenance/Maintenance_transaction';
import { Village } from './village';

@Entity('owner')
export class Owner extends Person {
  @Column({
    nullable: false
  })
  owner_of: string;

  @Column({
    type: 'numeric'
  })
  maintenance_fees: number;

  @Column()
  car_plate: string;

  @Column()
  status: string;

  // relation with Parent Village
  @ManyToOne(() => Village, (village) => village.owners)
  @JoinColumn({
    name: 'village_Id'
  })
  village: Village;

  // one to many with Transactions
  @OneToMany(
    () => MaintenanceTransaction,
    (maintenanceTransaction) => maintenanceTransaction.owner
  )
  maintenanceTransactions: MaintenanceTransaction[];
}
