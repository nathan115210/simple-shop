// import { Sequelize } from 'sequelize'; // Import Sequelize
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node-app', 'root', 'zmw9e632QQ1', {
  host: 'localhost',
  dialect: 'mysql',
}); // Create a new instance of Sequelize

export default sequelize;
