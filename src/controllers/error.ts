import type { Request, Response } from 'express';

const errorHandler = async (_req: Request, res: Response) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
  });
};

export default errorHandler;
