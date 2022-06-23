import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

const user: CreateUserInput = {
  name: 'Jhon Doe',
  email: 'jhondoe@email.com',
  password: '123456',
};

const userUpdate: UpdateUserInput = {
  id: 1,
  name: 'Jhon Doe',
  email: 'jhondoe@email.com',
  password: '123456',
};

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockReturnValue(user);
      const result = await service.create(user);

      expect(mockUserRepository.create).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should get a user list', async () => {
      mockUserRepository.find.mockReturnValue([user]);
      const result = await service.findAll();

      expect(mockUserRepository.find).toBeCalledTimes(1);
      expect(result).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      mockUserRepository.findOne.mockReturnValue(user);
      const result = await service.findOne(1);

      expect(mockUserRepository.find).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
    it('should throw a not found exception', async () => {
      mockUserRepository.findOne.mockReturnValue(null);
      expect(service.findOne(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      mockUserRepository.findOne.mockReturnValue(user);
      mockUserRepository.save.mockReturnValue(user);
      const result = await service.update(1, userUpdate);

      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUserRepository.findOne.mockReturnValue(user);
      mockUserRepository.delete.mockReturnValue(true);
      const result = await service.remove(1);

      expect(mockUserRepository.delete).toBeCalledTimes(1);
      expect(result).toEqual(true);
    });
    it('should throw a internal server error exception', async () => {
      mockUserRepository.delete.mockReturnValue(null);
      expect(service.remove(1)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
