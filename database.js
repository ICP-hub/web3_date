const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: "DDateoiyys2331Z&hh",
  database: 'ddate'
});

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   port: '5432',
//   username: 'postgres',
//   password: "rooot",
//   database: 'postgres',
//   logging: false, // Set to true to log queries
// });

module.exports = sequelize;