import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  // private for this.repository
  // @InjectRepository?
  // dependency injection system is not able to understand generic Repository<User> so it is manually passed to the decorator
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    // create an entity instance
    // Validation logic in instance creation can be done.

    return this.repo.save(user); // {email, password} -> could be done but instance creation is better
    // save entity to the db
  }
}
