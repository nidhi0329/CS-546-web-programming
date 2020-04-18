
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var port = 3000;
var router = express.Router();
const eh = require("express-handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', router);
app.engine('handlebars', eh());
app.set('view engine', 'handlebars');

router.get('/', function (req, res) {
  res.render('home', { layout: 'main', title: "The Best Palindrome Checker!" });
});

app.listen(port, () => {
  console.log("Your server will be running on http://localhost:" + port);
});