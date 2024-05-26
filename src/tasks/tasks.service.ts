//nest g service tasks --no-spec
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }
}
