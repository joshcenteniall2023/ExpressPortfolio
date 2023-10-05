//Express.js Joshua Morla Morales, 301196645
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = function () {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }

  app.use(bodyParser.urlencoded({ 
    extended: true 
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use('/', require('../app/routes/index.server.routes.js'));
  app.use(express.static('./public'));
  app.use(express.static("./node_modules"));
  
  return app;
};