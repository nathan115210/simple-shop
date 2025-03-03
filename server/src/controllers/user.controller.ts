import { Request, Response } from 'express';
import { addUser, UserModel, users } from '../models/user.model';

export const getUsers = (_req: Request, res: Response) => {
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const newUser: UserModel = { id: users.length + 1, ...req.body };
  addUser(newUser);
  res.status(201).json(newUser);
};

export const getUserById = (req: Request, res: Response) => {
  const userId = (req.params as any).userId;
  const user = users.find((user: UserModel) => user.userId === parseInt(userId));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};