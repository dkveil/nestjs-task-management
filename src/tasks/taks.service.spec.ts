import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser: User = {
  username: 'Testuser',
  id: '1234',
  password: 'Testpassword1!',
  tasks: [],
};

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, { provide: TaskRepository, useFactory: mockTaskRepository }],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Test task',
          description: 'Test description',
          status: TaskStatus.OPEN,
          user: mockUser,
        },
      ];

      taskRepository.getTasks.mockResolvedValue(mockTasks);
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filterDto: GetTasksFilterDto = { status: TaskStatus.OPEN, search: 'test' };
      const result = await taskService.getTasks(filterDto, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalledWith(filterDto, mockUser);
      expect(result).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        status: TaskStatus.OPEN,
        user: mockUser,
      };

      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('1', mockUser);

      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: '1',
          user: mockUser,
        },
      });
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and handles an error', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskById('1', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
