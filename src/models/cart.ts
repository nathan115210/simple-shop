import {
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';
import CartItem from './cartItem';
import Product from './product';

interface CartModel
  extends Model<
    InferAttributes<CartModel>,
    InferCreationAttributes<CartModel>
  > {
  cartId: number;
  userId: number;
}

class Cart
  extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>>
  implements CartModel
{
  public cartId!: number;
  public userId!: number;
  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public setProducts!: BelongsToManySetAssociationsMixin<Product, number> &
    ((products: Product[] | null) => Promise<void>);

  // Add the addProduct method to the Cart model
  public addProduct!: BelongsToManyAddAssociationMixin<Product, number>;
  public getCartItems!: HasManyGetAssociationsMixin<CartItem>;
}

Cart.init(
  {
    cartId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Cart' },
);

export default Cart;
