const session = require('express-session');

module.exports = session({
    saveUninitialized: false,
    resave: true,
    secret: process.env.APP_SECRET,
    cookie: { secure: false },
});
