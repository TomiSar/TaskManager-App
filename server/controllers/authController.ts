import { Request, Response } from 'express';
import { AppDataSource } from '../connection/db';
import { User } from '../models/userEntity';
import {
  comparePassword,
  hashPassword,
} from '../utils/passwordUtils';
import { createJWT } from '../utils/jwtUtils';

// REGISTER USER
// @desc   Register new User
// @route  POST  /api/users/register
// @access Public
const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await AppDataSource.getRepository(
      User,
    ).findOneBy({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = hashedPassword;

    const createdUser =
      await AppDataSource.getRepository(User).save(newUser);
    res.status(201).json({
      message: 'User created successfully',
      createdUser,
    });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

// LOGIN USER
// @desc   Register new User
// @route  POST  /api/users/login
// @access Public
const loginUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await AppDataSource.getRepository(
      User,
    ).findOneBy({ email });
    if (
      user &&
      (await comparePassword(password, user.password))
    ) {
      const token = createJWT({
        id: user.id,
        email: user.email,
      });

      // Set token to cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 8 * 60 * 60 * 1000, // expires after 8 hours
      });
      res
        .status(200)
        .json({ message: 'User Login successful' });
    } else {
      res.status(401).json({
        message:
          'User Not authorized: invalid user credentials (email or password)',
      });
    }
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

// LOGIN USER
// @desc   Register new User
// @route  POST  /api/users/logout
// @access Public
const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res
    .status(200)
    .json({ message: 'User Logged Out successfully' });
};

// GET USER
// @desc   Fetch single User
// @route  GET  /api/users/:id
// @access Private
const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await AppDataSource.getRepository(
      User,
    ).findOneBy({ id });

    if (!user) {
      res
        .status(404)
        .json({ error: 'User with given id not found' });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

// GET ALL USERS
// @desc   Fetch all Users
// @route  GET  /api/users/
// @access Private
const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const allUsers =
      await AppDataSource.getRepository(User).find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  getAllUsers,
};
