import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//Only get access to session!!
// not other services instances
export const CurrentUser = createParamDecorator(
  // context -> request
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
