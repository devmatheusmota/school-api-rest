import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { getJwt } from 'src/utils/getJwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const { role } = getJwt(request);
    if (!role) {
      return false;
    }
    const hasRole = () => roles.includes(role);

    return roles && hasRole();
  }
}
