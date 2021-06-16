const express = require('express');
const app = express();
const businessesRoute = require('./routes/businesses');
const eventsRoute = require('./routes/events');
const port = process.env.PORT || 8080;

const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}${port}/auth/google/callback`
},
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        })
    }
));

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});

// https://www.youtube.com/watch?v=o9e3ex-axzA


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log("Incoming request for path " + req.path);
//     next();
// })

// home route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// api routes
app.use('/business', businessesRoute);
app.use('/events', eventsRoute);

app.listen(port, () => {
    console.log(`Server is listening at ${process.env.API_URL}${port}`);
})