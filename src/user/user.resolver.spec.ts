import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResolver } from './user.resolver';
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

describe('UserResolver', () => {
  let resolver: UserResolver;

  const mockUserService = {
    create: jest.fn().mockResolvedValue(user),
    findAll: jest.fn().mockResolvedValue([user]),
    findOne: jest.fn().mockResolvedValue(user),
    update: jest.fn().mockResolvedValue(user),
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const result = await resolver.createUser(user);

      expect(mockUserService.create).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should get a user list', async () => {
      const result = await resolver.findAll();

      expect(mockUserService.create).toBeCalledTimes(1);
      expect(result).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      const result = await resolver.findOne(1);

      expect(mockUserService.findAll).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const result = await resolver.updateUser(userUpdate);

      expect(mockUserService.update).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      const result = await resolver.removeUser(1);

      expect(mockUserService.remove).toBeCalledTimes(1);
      expect(result).toEqual(true);
    });
  });
});
