const express = require('express');
const app = express();


//Import our Page Routes
const pageRoutes = require('./routes/pages');
const beerRoutes = require('./routes/beers');
const testersRoutes = require('./routes/tester');
const sessionsRoutes = require('./routes/sessions');


//Register our Page Routes with our app
app.use('/', pageRoutes);
app.use('/beers', beerRoutes);
app.use('/testers', testersRoutes);
app.use('/', sessionsRoutes);

//Export our changes
module.exports = app;