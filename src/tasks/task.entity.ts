import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from './task.model';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  finishAt: Date | null;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, user => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
