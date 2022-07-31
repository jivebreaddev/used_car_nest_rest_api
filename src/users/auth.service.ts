import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindRelationsNotFoundError, In } from 'typeorm';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'; // scrypt hash the password
import { promisify } from 'util'; // callbacks

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // hash the users password // we do not store password string in sql hashing funciton!
    //generate a salt
    const salt = randomBytes(8).toString('hex');
    // lkijfdgoijdifg 16 chars or numbers

    // hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 characters
    // join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    // cretae a new user and save it
    const user = await this.usersService.create(email, result);
    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
