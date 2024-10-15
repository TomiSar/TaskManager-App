import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
import { User } from './userEntity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  title: string;

  @Column({ type: 'datetime' })
  creationDate: Date;

  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column('varchar', { length: 320 })
  description: string;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.medium,
  })
  priority: Priority;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.todo,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
