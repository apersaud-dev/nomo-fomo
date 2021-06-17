const express = require('express');
const app = express();
const businessesRoute = require('./routes/businesses');
const eventsRoute = require('./routes/events');
const Business = require('./models/businesses');
const port = process.env.PORT || 8080;

const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
// require('passport-setup.js');
const IsLoggedIn = require('./middleware/IsLoggedIn');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}${port}/auth/google/callback`
},
    function(accessToken, refreshToken, profile, cb) {
        const businessEmail = profile.emails[0].value;
        // console.log(businessEmail);
        Business.where({ email: businessEmail })
        .fetch()
        .then((business) => {
            console.log('Business profile found');
            cb(null, business);
        })
        .catch((err) => console.log(err));
        // ,() => {
        //     // create a new user if not found
        //     console.log('Business profile not found!');
        //     })
        // }
        // )
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // })
    // }
}
));

passport.serializeUser((business, cb) => {
    const businessDisplayId = business.attributes.display_id;
    // console.log(businessDisplayId);
    cb(null, businessDisplayId);
})

passport.deserializeUser((businessDisplayId, cb) => {
    Business.where({ display_id: businessDisplayId})
        .fetch()
        .then(
            (user) => {
                // console.log('found user');
                cb(null, user);
            },
            
            (err) => {
                cb(err);
            })
        
        .catch((err) => {
            cb(err);
        });
});
// end of passport setup and configuration


// home route
app.get('/', (req, res) => res.send('Welcome to my API') );


app.get('/login', (req, res) => res.send('You failed to log in!') );

// app.get('http://localhost:3000/profile', IsLoggedIn, (req, res) => {
//     // console.log(req.user);
//     res.send(`Welcome ${req.user.attributes}`)
// } );


app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // console.log(req);
        // console.log(res.sessionID);
        // console.log(req.user.attributes.display_id);
        // console.log(res);
        // console.log(res.user.attributes);
        res.redirect('http://localhost:3000/profile');   
});

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('http://localhost:3000/');  //should this redirect to a localhost:3000 address?
})

// app.get('/trial', (req, res) => {
//     if (!req.user) {
//         res.sendStatus(401);
//         return;
//     }
//     // console.log(req.user);
//     // console.log(req.session);
//     // console.log(Object.keys(req));
//     res.send(200);
// })

// api routes
app.use('/business', businessesRoute);
app.use('/events', eventsRoute);

app.listen(port, () => {
    console.log(`Server is listening at ${process.env.API_URL}${port}`);
})




// https://www.youtube.com/watch?v=o9e3ex-axzA

/* THIS HAS BEEN MOVED TO A SEPARATE FILE
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'ERROR: User does not exist'});
    }
};
*/