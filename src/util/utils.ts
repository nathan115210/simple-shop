import type { CustomUserRequest } from './types';

export const isLoggedIn = async (req: CustomUserRequest): Promise<Boolean> => {
  return !!req.get('Cookie')?.includes('loggedIn=true');
};
