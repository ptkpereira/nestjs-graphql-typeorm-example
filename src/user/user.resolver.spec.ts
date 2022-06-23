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
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      mockUserService.create.mockReturnValue(user);
      const result = await resolver.createUser(user);

      expect(mockUserService.create).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should get a user list', async () => {
      mockUserService.findAll.mockReturnValue([user]);
      const result = await resolver.findAll();

      expect(mockUserService.create).toBeCalledTimes(1);
      expect(result).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      mockUserService.findOne.mockReturnValue(user);
      const result = await resolver.findOne(1);

      expect(mockUserService.findAll).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      mockUserService.update.mockReturnValue(user);
      const result = await resolver.updateUser(userUpdate);

      expect(mockUserService.update).toBeCalledTimes(1);
      expect(result).toEqual(user);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      mockUserService.remove.mockReturnValue(true);
      const result = await resolver.removeUser(1);

      expect(mockUserService.remove).toBeCalledTimes(1);
      expect(result).toEqual(true);
    });
  });
});
