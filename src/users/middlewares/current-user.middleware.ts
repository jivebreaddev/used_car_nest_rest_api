import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    // isn't this monkey patching??
    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }
  }
}
// tHIS WILL INVOKE USERID ALL THE TIME...
// BAD BUT INTERCEPTOR CANNOT DO.
// ROUTE HAS TO BE SET i GUESS
