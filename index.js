const express = require("express");
const sequelize = require("./database");
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // or use ['http://127.0.0.1:8080', 'http://localhost:3001'] to allow both
};


app.use(cors(corsOptions));
app.use(express.json());


app.use('/api/v1',routes.userRoutes);
app.use('/api/v1',routes.chatRoute);

module.exports = app;
const server = require('./socket/index');

server.listen(PORT, async () => {
  sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});