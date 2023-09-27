require('dotenv').config();
const express = require('express');
const mongodb = require('./db/connect');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
const { centralErrorHandler } = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

app
  .use(express.json())
  .use(cors()) 
  .use('/', require('./routes'))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Centralized error handler
app.use(centralErrorHandler);

let server;

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    server = app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});

const gracefulShutdown = () => {
  console.log("\nGracefully shutting down...");

  // Close the server
  server.close(() => {
    console.log("HTTP server closed.");      
    process.exit(0);
  });
};

// Listen for the signals and trigger the graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
