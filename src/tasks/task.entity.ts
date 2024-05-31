import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({type: 'timestamp'})
  createAt: Date;

  @Column({type: 'timestamp', default: null, nullable: true})
  finishAt: Date | null;

  @Column()
  status: TaskStatus;
}