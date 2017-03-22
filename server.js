var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);

require("./assignment/model/models.server")(app);

var port = process.env.PORT || 3000;

app.listen(port);
