const express = require('express');
const Events = require('./../models/events');
const Business = require('./../models/businesses');
const router = express.Router();

// get all events with related business
router
    .route('/')
    .get((req, res) => {
        Events.fetchAll({ withRelated: ['businesses'] })
        .then((events) => {
            res.status(200).json(events);
        })
        .catch(() => {
            res.status(400).json({ message: 'ERROR: cannot fetch events data' });
        });
    });

module.exports = router;