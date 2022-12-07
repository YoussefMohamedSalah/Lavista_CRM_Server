import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { Owner } from '../Owner';
import { Village } from '../village';
import { Worker } from '../Worker';

export enum PaymentMethod {
  VISA = 'visa',
  CASH = 'cash',
  CHECK = 'check'
}

@Entity('maintenance_transaction')
export class MaintenanceTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod
  })
  type: string;

  @Column({
    type: 'numeric'
  })
  amount: number;

  @Column({
    default: ''
  })
  worker_name: string;

  @Column({
    type: 'uuid'
  })
  worker_id: string;

  @Column({
    default: ''
  })
  owner_name: string;

  @Column({
    type: 'uuid'
  })
  owner_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'numeric'
  })
  maintenance_before_transaction: number;

  @Column({
    type: 'numeric'
  })
  maintenance_after_transaction: number;

  // one to many with Owner
  @ManyToOne(() => Village, (village) => village.maintenanceTransactions)
  @JoinColumn({
    name: 'village_id'
  })
  village: Village;

  // one to many with Worker
  @ManyToOne(() => Worker, (worker) => worker.maintenanceTransactions)
  @JoinColumn({
    name: 'worker_id'
  })
  worker: Worker;

  // one to many with Owner
  @ManyToOne(() => Owner, (owner) => owner.maintenanceTransactions)
  @JoinColumn({
    name: 'owner_id'
  })
  owner: Owner;
}
