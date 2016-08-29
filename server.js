// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// require routes file
require('./server/config/routes.js')(app);
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, '/client/static')));
app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});
