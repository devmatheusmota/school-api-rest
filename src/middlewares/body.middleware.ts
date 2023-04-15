import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class BodyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { body } = req;

    /* Se algum campo vier vazio, esse loop impedirá de ir algo em branco pro BD */

    for (const prop in body) {
      if (body[prop] === '') {
        body[prop] = undefined;
      }
    }
    next();
  }
}
