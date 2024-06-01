//nest g controller tasks --no-spec
import { Body, Controller, Get, Param, Post, Delete, Patch, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@GetUser() user: User, @Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@GetUser() user: User, @Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { status } = updateTaskDto;

    if (!status) throw new NotFoundException('Status is required');

    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Patch('/:id/description')
  updateTaskDescription(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() UpdateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { description } = UpdateTaskDto;

    if (!description) throw new NotFoundException('Description is required');

    return this.taskService.updateTaskDescription(id, description, user);
  }
}
