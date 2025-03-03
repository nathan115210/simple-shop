import { Request, Response } from 'express';
import { addUser, UserModel, users } from '../models/user.model';

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const newUser: UserModel = { id: users.length + 1, ...req.body };
  addUser(newUser);
  res.status(201).json(newUser);
};
