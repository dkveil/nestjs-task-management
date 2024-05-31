//nest g controller tasks --no-spec
import { Body, Controller, Get, Param, Post, Delete, Patch, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

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

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { status } = updateTaskDto;

    if (!status) throw new NotFoundException('Status is required');

    return this.taskService.updateTaskStatus(id, status);
  }

  @Patch('/:id/description')
  updateTaskDescription(@Param('id') id: string, @Body() UpdateTaskDto: UpdateTaskDto): Promise<Task> {
    const { description } = UpdateTaskDto;

    if (!description) throw new NotFoundException('Description is required');

    return this.taskService.updateTaskDescription(id, description);
  }
}
