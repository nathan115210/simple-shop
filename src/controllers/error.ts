import type { Request, Response } from 'express';

const errorHandler = async (_req: Request, res: Response) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
  });
};

export default errorHandler;
