const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        console.log(req);
        res.send("Confirmation message")
    })
    .catch((err) => console.log(err));