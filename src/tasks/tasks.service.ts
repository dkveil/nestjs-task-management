//nest g service tasks --no-spec
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {

  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id }});

    if(!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    console.log(this.taskRepository);

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);

  //   this.tasks = this.tasks.filter(task => task.id !== foundTask.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);

  //   if (!task) return null;

  //   task.status = status;

  //   if (status === TaskStatus.DONE) {
  //     task.finishAt = new Date();
  //   } else {
  //     task.finishAt = null;
  //   }

  //   return task;
  // }

  // updateTaskDescription(id: string, description: string): Task {
  //   const task = this.getTaskById(id);

  //   if (!task) return null;

  //   task.description = description;
  //   return task;
  // }
}
