import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  title: string;

  // @Column({ type: 'date' })
  @Column('varchar', { length: 255 })
  date: Date;

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
}
