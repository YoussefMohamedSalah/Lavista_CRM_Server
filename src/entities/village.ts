import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Category } from './Category';
import { Owner } from './Owner';
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
  @OneToMany(() => Owner, (owner) => owner.village)
  owners: Owner[];

  // relasion with cild User
  @OneToMany(() => User, (user) => user.village)
  users: User[];

  // relasion with cild Worker
  @OneToMany(() => Worker, (worker) => worker.village)
  workers: Worker[];

  // relasion with cild Category
  @OneToMany(() => Category, (category) => category.village)
  categories: Category[];
}
