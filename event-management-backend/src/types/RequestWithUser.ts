import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email?: string;
    // Add more fields from your JWT payload if needed
  };
}