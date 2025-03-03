import type { Response } from 'express';
import { CustomUserRequest } from '../util/types';

const errorHandler = async (req: CustomUserRequest, res: Response) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isAuthenticated: !!req.isLoggedIn,
  });
};

export default errorHandler;
