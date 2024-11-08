import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';

interface OrderItemModel
  extends Model<
    InferAttributes<OrderItemModel>,
    InferCreationAttributes<OrderItemModel>
  > {
  id: number;
  qty: number;
}

class OrderItem
  extends Model<
    InferAttributes<OrderItemModel>,
    InferCreationAttributes<OrderItemModel>
  >
  implements OrderItemModel
{
  public id!: number;
  public qty!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    qty: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'OrderItem' },
);

export default OrderItem;
