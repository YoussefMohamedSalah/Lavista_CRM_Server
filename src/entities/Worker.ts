import { Person } from './utils/Person';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Village } from './village';
import { MaintenanceTransaction } from './maintenance/Maintenance_transaction';

@Entity('worker')
export class Worker extends Person {
  @Column({
    nullable: false,
    length: 14
  })
  id_number: string;

  @Column({
    nullable: false
  })
  working_section: string;

  @Column()
  start_working_data: string;

  @Column({
    nullable: true
  })
  finish_working_data: string;

  @Column({
    type: 'boolean',
    default: true
  })
  now_working: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false
  })
  has_permission: boolean;

  @Column({
    nullable: true
  })
  permission_type: string;

  @Column({
    nullable: true
  })
  reason_to_leave: string;

  // relasion with Parent Village
  @ManyToOne(() => Village, (village) => village.workers)
  @JoinColumn({
    name: 'village_Id'
  })
  village: Village;

  // relasion with cild Transactions
  @OneToMany(
    () => MaintenanceTransaction,
    (maintenanceTransaction) => maintenanceTransaction.worker
  )
  maintenanceTransactions: MaintenanceTransaction[];
}
