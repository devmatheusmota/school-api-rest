import { SetMetadata } from '@nestjs/common';

/**
 * @description @description
 * @description ENUM de Permissões
 */
export enum ROLE {
  /**
   * @description Admin permissions
   */
  ADMIN = 'ADMIN',
  /**
   * @description Student permissions
   */
  STUDENT = 'STUDENT',

  /**
   * @description Teacher permissions
   */
  TEACHER = 'TEACHER',
}

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
