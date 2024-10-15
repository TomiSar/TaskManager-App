import { User } from '../../models/userEntity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
