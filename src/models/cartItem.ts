import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';
import { CartItemProps } from '../util/types';

interface CartItemModel
  extends Model<
    InferAttributes<CartItemModel>,
    InferCreationAttributes<CartItemModel>
  > {
  id: CartItemProps['id'];
  qty: CartItemProps['qty'];
}

class CartItem
  extends Model<
    InferAttributes<CartItemModel>,
    InferCreationAttributes<CartItemModel>
  >
  implements CartItemModel
{
  public id!: CartItemProps['id'];
  public qty!: CartItemProps['qty'];
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    qty: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'CartItem' },
);

export default CartItem;
