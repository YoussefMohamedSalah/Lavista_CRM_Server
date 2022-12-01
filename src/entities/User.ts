import { Person } from './utils/Person';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Village } from './village';

export enum UserTypes {
  user = 'user',
  superManager = 'super_manager',
  villageManager = 'village_manager',
  qrCodeManager = 'qr_code_manager',
  ownersManager = 'owners_manager',
  workersManager = 'workers_manager',
  gateManager = 'gate_manager'
}

@Entity('user')
export class User extends Person {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  loggin: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserTypes,
    default: 'user'
  })
  user_type: string;

  @Column({
    nullable: true
  })
  manager_of: string;

  @Column({
    default: '',
    nullable: true
  })
  profile_image: string;

  @Column({
    nullable: false
  })
  villageId: string;

  // relasion with Parent Village
  @ManyToOne(() => Village, (village) => village.users)
  @JoinColumn({
    name: 'village_Id'
  })
  village: Village;
}
