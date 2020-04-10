const express = require("express");
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

app.get('/', function (req, res) {
  res.render('home', { layout: 'main', title: "The Best Palindrome Checker in the World!", success: 1 });
});

router.post('/result', function (req, res) {
  if (req.body['text-to-test']) {
    var re = /[^A-Za-z0-9]/g;
    var lowRegStr = req.body['text-to-test'].toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    if (lowRegStr && reverseStr === lowRegStr) {
      res.render('result', { layout: 'main', title: "The Palindrome Results!", message: "Given string is palindrome!", string_name: req.body['text-to-test'] });
    } else {
      res.render('result', { layout: 'main', title: "The Palindrome Results!", error: "Given string is not palindrome!", string_name: req.body['text-to-test'] });
    }
  } else {
    res.status(400).render('result', { layout: 'main', title: "The Best Palindrome Checker in the World!", string_error: "Please enter any string!" });
  }

});

app.listen(port, () => {
  console.log("Your server will be running on http://localhost:" + port);
});