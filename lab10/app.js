const express = require('express');
var session = require('express-session');
const app = express();

const configRoutes = require('./routes');
const hbs = require('express-handlebars');

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'AuthCookie',
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    var UTCdate = new Date().toUTCString()
    var method = req.method;
    var originalUrl = req.originalUrl;
    var valid_user = (req.session.user) ? ' Authenticated User' : ' Non Authenticated User';
    console.log(`${UTCdate}` + " " + `${method}` + `${originalUrl}` + " " + `${valid_user}`);
    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes running on http://localhost:3000');
});