import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createAt: Date;

  @Column()
  finishAt: Date;

  @Column()
  status: TaskStatus;
}