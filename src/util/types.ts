export interface ProductProps {
  id: string;
  title: string;
  price?: string;
  description?: string;
  imageUrl?: string;
}

export interface CartItemProps {
  id:string;
  qty: number;
  productInfo: ProductProps;
}

export interface CartProps {
  cartItems: CartItemProps[];
  totalPrice: number;
}
