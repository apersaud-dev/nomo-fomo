const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Event = require('./../models/events');
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

// create a new event

router
    .route('/:businessId')
    .post((req, res) => {
        const businessDisplayId = req.params.businessId;
        Business.where({ display_id: businessDisplayId})
        .fetch()
        .then((business)=> {
            new Event({
                display_id: uuidv4(),
                business_id: business.id,
                name: req.body.name,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                description: req.body.description,
                restrictions: req.body.restrictions,
                fee: req.body.fee,
                image: req.body.image,
                category: req.body.category
            })
            .save()
            .then((newEvent) => {
                console.log(newEvent);
                res.status(201).json(newEvent);
            })
        })
        .catch((err)=> {
            console.log(err);
            res.status(400).json({ message: 'ERROR: cannot create new event'})
        });

    });



module.exports = router;