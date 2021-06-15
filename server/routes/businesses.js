const express = require('express');
const { default: knex } = require('knex');
// const Business = require('./../models/businesses');
const router = express.Router();

// get all businesses with related events
router
    .route('/')
    .get((req, res) => {
        // Business.fetchAll({ withRelated: ['events']})
        // .then((businesses) => {
        //     res.status(200).json(businesses);
        // })
        knex
            .select('*')
            .from('businesses')
            .then((data) => {
                res.json(data);
            })
            .catch(() => 
            res.status(400).json({ message: "ERROR: cannot fetch businesses data"})
            );
    });

module.exports = router;