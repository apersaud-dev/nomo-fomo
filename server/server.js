const express = require('express');
const app = express();
const cors = require('cors');
// const { default: App } = require('../client/src/App');
const businesses = require('./routes/businesses');
const events = require('./routes/events');

require('dotenv').config();
const port = process.env.PORT || 8080;

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
app.use('/business', businesses);
app.use('/events', events);

app.listen(port, () => {
    console.log(`Server is listening at ${process.env.API_URL}${port}`);
})