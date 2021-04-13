const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const users = require('../data/users');

const middleware = function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.status(403).render('method/error', {
            error_message: "Access Denied!!"
        });
    }
}

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    }
    else {
        res.render('method/form');
    }

});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let authenticate = false;
    users.filter(dt => {
        if(username == dt.username){
            var hash = dt.hashedPassword;
            if (bcrypt.compareSync(password, hash)) {
                authenticate = true
                return true;
            }
        }
    });
    if (authenticate == true) {
        req.session.user = username;
        res.redirect('/private');
    }
    else {
        res.render('method/form', {
            error_message: "Enter valid Information"
        })
    }
});

router.get('/private', middleware, async (req, res) => {
    if (!req.session.user) {
        res.status(401).render('method/error', {
            error_message: "Access Denied!!"
        })
    } else {
        var username = req.session.user;
        const user_data = users.find(dt => (username == dt.username) )
        res.render('method/detail', { data: user_data });
    }
});


router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.render('method/logout', {
            message: "Successfully logout"
        });
    }
})

module.exports = router;
