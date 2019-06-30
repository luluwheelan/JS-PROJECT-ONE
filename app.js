
require('dotenv').config();

//Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser:true
}).catch(err => console.error(`ERROR: ${err}`));
//End Mongoosee


// JavaScript Document
const express = require('express');
const path = require('path');

const app = express();

//Adding cookies and sessions support to our app
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');


app.use(cookieParser());

app.use(session({
  secret: (process.env.secret || 'boorakacha'),
  cookie: {
    max: 10800000
  },
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {

  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash('success') || null;
  res.locals.flash.error = req.flash('error') || null;

  next(); //comtiniue one to the next
});

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//End Parser

//Our views path
app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/css', express.static('assets/stylesheets')); 
app.use('/js', express.static('assets/javascripts')); 
app.use('/images', express.static('assets/images')); 


//Authenticated helpers
const isAuthenticated = (req) => {
  return req.session && req.session.userId;
};
app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) {
      req.flash('error', `Hey dude, please login or register first`);
      res.redirect('/');
    }
  }

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});

//Our routes. Need make sure this is at the buttom of the page
const routes = require('./routes.js');
app.use('/', routes);

const port = (process.env.PORT || 4000)

app.listen(port,() => console.log(`Listening on ${port}`));