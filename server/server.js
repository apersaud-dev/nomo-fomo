const express = require('express');
const app = express();
const cors = require('cors');
const { default: App } = require('../client/src/App');

require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log("Incoming request for path " + req.path);
    next();
})

app.listen(`${process.env.API_URL}${process.env.PORT}`, () => {
    console.log(`Server running at ${process.env.API_URL}${process.env.PORT}`)
});