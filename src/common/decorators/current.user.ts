import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { KeycloakUser } from 'src/auth/keycloak.user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): KeycloakUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user!;
  },
);
