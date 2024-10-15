import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../connection/db';
import { User } from '../models/userEntity';

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      const user = await AppDataSource.getRepository(
        User,
      ).findOneBy({
        id: decoded.id,
      });

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      // Attach user to the req object
      req.user = user;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: 'Not authorized, token failed' });
    }
  } else {
    res
      .status(401)
      .json({ message: 'No token, authorization denied' });
  }
};
