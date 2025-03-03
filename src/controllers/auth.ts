import { Response } from 'express';
import { CustomUserRequest } from '../util/types';
import { isLoggedIn } from '../util/utils';

const getLogin = async (req: CustomUserRequest, res: Response) => {
  console.log('get Login - getLogin()');
  const isAuthenticated = await isLoggedIn(req);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated,
  });
};

const postLogin = async (req: CustomUserRequest, res: Response) => {
  console.log('post Login - postLogin()');
  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; Secure; HttpOnly');
  res.redirect('/');
};

export default {
  getLogin,
  postLogin,
};
