const express = require("express");
const sequelize = require("./database");
const routes = require('./routes');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.use('/api/v1',routes.userRoutes);
app.use('/api/v1',routes.chatRoute);

app.use(helmet.contentSecurityPolicy({
  directives: {
    "connect-src": ["'self'", "http://localhost:3000", "https://icp0.io", "https://*.icp0.io", "https://icp-api.io"]
  }
}));

const corsOptions = {
  origin: ['http://127.0.0.1:8080', 'http://localhost:3001'], // or use ['http://127.0.0.1:8080', 'http://localhost:3001'] to allow both
};


app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", ['http://127.0.0.1:8080', 'http://localhost:3001']);
//   // other headers
//   next();
// });


module.exports = app;
const server = require('./socket/index');

server.listen(PORT, async () => {
  sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});
  

// const express = require("express");
// const sequelize = require("./database");
// const routes = require('./routes');
// const cors = require('cors');
// const helmet = require('helmet');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // Configure CORS options
// const corsOptions = {
//   origin: ['http://127.0.0.1:8080', 'http://localhost:3001'],
// };


// //app.use(cors());
// // Apply CORS middleware with the specified options
// app.use(cors(corsOptions));

// // Apply Helmet for security headers (including CSP)
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     "connect-src": ["'self'", "http://localhost:3000", "https://icp0.io", "https://*.icp0.io", "https://icp-api.io"]
//   }
// }));

// // Define routes
// app.use('/api/v1', routes.userRoutes);
// app.use('/api/v1', routes.chatRoute);

// // Initialize server and database
// const server = require('./socket/index');
// server.listen(PORT, async () => {
//   await sequelize.sync();
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;