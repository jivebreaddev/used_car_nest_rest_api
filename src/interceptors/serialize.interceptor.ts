import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

// type saftey around decorator is a bit hard in typescript
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// format the DTOs as we want!! for outgoing response
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // run something request is handled by request handler before
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // this will remove any values extra other than dto
        });

        //        console.log('I am running before response is sent out', data);
      }),
    );
  }
}
