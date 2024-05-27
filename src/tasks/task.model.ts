export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createAt: Date;
  finishAt: Date;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
