const express = require('express');
const app = express();
const cors = require('cors');
const { default: App } = require('../client/src/App');

require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Incoming request for path " + req.path);
    next();
})

// api routes
app.use('/events', events);

app.listen(port, () => {
    console.log(`Server is listening at ${process.env.API_URL}${port}`);
})