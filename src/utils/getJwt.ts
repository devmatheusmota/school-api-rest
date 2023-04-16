import { Request } from 'express';
import { decode } from 'jsonwebtoken';

interface JWT {
  id: number;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const getJwt = (request: Request) => {
  return decode(request.headers.authorization.split(' ')[1]) as JWT;
};
