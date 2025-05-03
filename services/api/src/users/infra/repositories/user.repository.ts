import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, User as UserEntity } from '../entities/user.entity';
import { UserInterface } from 'src/users/domain/entities/user';
import { UserRepositoryInterface } from 'src/users/domain/repositories/users.repository';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserInterface | null> {
    const user = await this.repository.findOneBy({ email });
    return user ? user : null;
  }

  async createUser(user: Partial<UserInterface>): Promise<User> {
    const entity = this.repository.create(user);
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }

  async updateUser(id: string, updateData: Partial<UserInterface>): Promise<User> {
    const entity = await this.repository.preload(updateData);
    if (!entity) {
      throw new Error(`User ${id} not found`);
    }
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}

