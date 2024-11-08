import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';
import type { ProductProps } from '../util/types';
import CartItem from './cartItem';
import OrderItem from './orderItem';
import User from './user';

interface ProductModel
  extends Model<
    InferAttributes<ProductModel>,
    InferCreationAttributes<ProductModel>
  > {
  id: ProductProps['id'];
  title: ProductProps['title'];
  price: ProductProps['price'];
  description: ProductProps['description'];
  imageUrl: ProductProps['imageUrl'];
  userId: User['id'];
}

class Product
  extends Model<
    InferAttributes<ProductModel>,
    InferCreationAttributes<ProductModel>
  >
  implements ProductModel
{
  public id!: ProductProps['id'];
  public title!: ProductProps['title'];
  public price!: ProductProps['price'];
  public description!: ProductProps['description'];
  public imageUrl!: ProductProps['imageUrl'];
  public userId!: number;

  // Add the cartItem and orderItem properties to the Product model
  public CartItem!: CartItem;
  public OrderItem!: OrderItem;
  
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue:
        'https://media.istockphoto.com/id/173015527/fi/valokuva/yksi-punainen-kirja-valkoisella-pinnalla.jpg?s=1024x1024&w=is&k=20&c=WtyN8_Bpc3xXXxbPG6JBG5p42yrsBUMwvlhkifL984U=',
    },
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Product',
  },
);

export default Product;
