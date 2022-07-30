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

    return this.repo.save(user); // {email, password} -> could be done but instance creation is better because hooks can be executed
    // save entity to the db                             like @afterinsert or @afterupdate
  }

  async findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }
  // Update part of the properties  from user with Partial
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  // save will do the hooks vs update will not
  // retrieve the instance and apply update and save to invoke hook
  // if hooks are not required, do update
  // remove[Entity] vs delete(id) -> one trip to database and hook will not be executed
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
