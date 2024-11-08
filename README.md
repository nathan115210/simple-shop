# simple-shop

The purpose of the `simple-shop` project is to create a basic e-commerce application where users can browse products, add them to their cart, and manage their orders. The project serves as a learning tool for understanding how to build a full-stack application using modern web technologies.

## Technologies Used

The project utilizes the following technologies:

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **Sequelize**: ORM (Object-Relational Mapping) for interacting with the MySQL database.
- **MySQL**: Relational database management system for storing product and order data.
- **TypeScript**: Superset of JavaScript that adds static typing to the language.

## API Endpoints

### Product Endpoints

- **GET /products**: Retrieve a list of all products.
- **GET /products/:productId**: Retrieve details of a specific product by its ID.
- **POST /admin/add-product**: Add a new product (admin only).
- **POST /admin/edit-product**: Edit an existing product (admin only).
- **POST /admin/delete-product**: Delete a product (admin only).

### Cart Endpoints

- **GET /cart**: Retrieve the current user's cart.
- **POST /cart/add-product**: Add a product to the cart.
- **POST /cart/delete-product**: Remove a product from the cart.

### Order Endpoints

- **GET /orders**: Retrieve a list of all orders for the current user.
- **POST /create-order**: Create a new order from the current user's cart.

### User Endpoints

- **GET /login**: Render the login page.
- **POST /login**: Authenticate a user and start a session.
- **POST /logout**: Log out the current user and end the session.

### Error Handling

- **GET /404**: Render the 404 error page for non-existent routes.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone git@github.com:nathan115210/simple-shop.git
   cd simple-shop# simple-shop
   ```
2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up the database**:

- Ensure MySQL is running on your machine.
- Create a database named node-app.
- Update the database credentials in src/util/db.ts.

4. **Run the application:**:

   ```sh
   npm run dev
   ```

5. **Access the application: Open your browser and navigate to**:
   `http://localhost:3000`
