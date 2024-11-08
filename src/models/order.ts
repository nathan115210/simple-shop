import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../util/db';
import OrderItem from './orderItem';
import Product from './product';

interface OrderModel
  extends Model<
    InferAttributes<OrderModel>,
    InferCreationAttributes<OrderModel>
  > {
  orderId: number;
}

class Order
  extends Model<
    InferAttributes<OrderModel>,
    InferCreationAttributes<OrderModel>
  >
  implements OrderModel
{
  public orderId!: number;
  public getProducts!: HasManyGetAssociationsMixin<Product>;
  // Add the addProduct method to the Order model
  public addProducts!: BelongsToManyAddAssociationMixin<Product[], number>;
  public getOrderItems!: HasManyGetAssociationsMixin<OrderItem>;
  public Products!: Product[];
}

Order.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'Order' },
);

export default Order;
