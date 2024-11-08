import {
  Association,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';
import Cart from './cart';
import Order from './order';
import Product from './product';

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: number;
  name: string;
  email: string;
}

class User
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>
  implements UserModel
{
  public id!: number;
  public name!: string;
  public email!: string;

  // Add the createProduct method to the User model
  public createProduct!: (product: {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
  }) => Promise<Product>;

  // Add the getProducts method to the User model
  public getProducts!: HasManyGetAssociationsMixin<Product>;

  // Add the getCart method to the User model
  public getCart!: () => Promise<Cart>;

  // Add the createCart method to the User model
  public createCart!: HasOneCreateAssociationMixin<Cart>;

  // Add the createOrder method to the User model
  public createOrder!: () => Promise<Order>;
  // Add the getOrders method to the User model
  public getOrders!: HasManyGetAssociationsMixin<Order>;

  public static associations: {
    cart: Association<User, Cart>;
    products: Association<User, Product>;
    order: Association<User, Order>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'User' },
);

export default User;
