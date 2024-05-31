//nest g controller tasks --no-spec
import { Body, Controller, Get, Param, Post, Delete, Patch, Query, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
  //   const { status } = updateTaskDto;

  //   if (!status) throw new NotFoundException('Status is required');

  //   const task = this.taskService.updateTaskStatus(id, status);

  //   if (!task) throw new NotFoundException('Task not found');

  //   return task;
  // }

  // @Patch('/:id/description')
  // updateTaskDescription(@Param('id') id: string, @Body() UpdateTaskDto: UpdateTaskDto): Task {
  //   const { description } = UpdateTaskDto;

  //   if (!description) throw new NotFoundException('Description is required');

  //   const task = this.taskService.updateTaskDescription(id, description);

  //   if (!task) throw new NotFoundException('Task not found');

  //   return task;
  // }
}
