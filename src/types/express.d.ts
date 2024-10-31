import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: string | JwtPayload; // Atur tipe yang sesuai dengan isi token Anda
  }
}
