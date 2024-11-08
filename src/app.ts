import bodyParser from 'body-parser';
import express, { NextFunction, Response } from 'express';
import path from 'path';
import errorHandler from './controllers/error';
import Cart from './models/cart';
import CartItem from './models/cartItem';
import Order from './models/order';
import OrderItem from './models/orderItem';
import Product from './models/product';
import User from './models/user';
import adminRoute from './routes/admin';
import shopRoutes from './routes/shop';
import sequelize from './util/db';
import rootDir from './util/path';
import { CustomUserRequest } from './util/types';

const app = express();
let port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
// excuse all the files in the public folder
app.use(express.static(path.join(rootDir, '../src/public')));

// This middleware is used to save the user in the request object, so that it can be used in the views.
// this code will only run for incoming requests, which on  the other hand can only reached if we did successfully started the server: localhost: 3000.
// so we could be sure that the user is already in the database, and user, with id: 1, can be found here.
app.use((req: CustomUserRequest, _res: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user: User | null) => {
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch((err: unknown) =>
      console.error('app.use() error: can not find user with id: 1 :', err),
    );
});
//Admin route => /admin/add-product
app.use('/admin', adminRoute);

app.use(shopRoutes);

//404 page
app.use(errorHandler);

// relate the models, Product and User, to each other
// doc: https://sequelize.org/docs/v6/advanced-association-concepts/creating-with-associations/#belongsto--hasmany--hasone-association

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

// User.hasOne(Cart);
// User.hasMany(Product);
// User.hasMany(Order);

// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// Product.belongsToMany(Cart, { through: CartItem });

// Order.belongsTo(User);
// Order.belongsToMany(Product, { through: OrderItem });
sequelize
  /**
   * sync({alter: true}): Alters the existing tables to match the model definitions without dropping them. Useful for keeping data while updating the schema.
   * sync({force: true}): Drops all existing tables and recreates them from scratch. Useful for development environments where you want to start fresh each time.
   */
  // Synchronize models with the database
  .sync()
  // .sync()
  // Create dummy user - START
  .then(() => {
    return User.findByPk(1);
  })
  .then((user: User) => {
    if (!user) {
      return User.create({ name: 'User 1', email: 'user1@gmail.com', id: 1 });
    }
    return user;
  })
  // Create dummy user - END
  .then((user: User) => {
    // Create dummy cart - START
    return user.createCart();
    // Create dummy cart - END
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err: unknown) => console.error(err));
