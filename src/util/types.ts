import type { Request } from 'express';
import { OrderItem } from 'sequelize';
import CartItem from '../models/cartItem';
import User from '../models/user';

export interface ProductProps {
  id: number;
  title: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}

export interface CartItemProps {
  id: number;
  qty: number;
  productId: number;
}

export interface CartProps {
  cartItems: CartItemProps[];
  totalPrice: number;
}

// Extend the Request interface to include the user property
export interface CustomUserRequest extends Request {
  user?: User;
  isLoggedIn?: boolean;
}

declare module '../models/product' {
  interface Product {
    CartItem: CartItem;
    OrderItem: OrderItem;
  }
}
