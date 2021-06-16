const express = require('express');
const IsLoggedIn = require('./../middleware/IsLoggedIn');
const { v4: uuidv4 } = require('uuid');
const Business = require('./../models/businesses');
const Events = require('./../models/events');
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

// get a single event by 
router
    .route('/:eventId')


// create a new event
router
    .route('/:businessId')
    .post(IsLoggedIn, (req, res) => {
        const businessDisplayId = req.params.businessId;
        Business.where({ display_id: businessDisplayId})
        .fetch()
        .then((business)=> {
            new Events({
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

// edit an existing event
router
    .route('/:eventId')
    .put(IsLoggedIn, (req, res) => {
        Events.where({ display_id: req.params.eventId})
        .fetch()
        .then((event) => {
            event
                .save({
                    name: req.body.name,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                    description: req.body.description,
                    restrictions: req.body.restrictions,
                    fee: req.body.fee,
                    image: req.body.image,
                    category: req.body.category
                })
                .then((updatedEvent) => {
                    console.log(updatedEvent);
                    res.status(200).json(updatedEvent);
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'ERROR: cannot update event details' });
        });
    });

// delete an existing event
router
    .route('/:eventId')
    .delete(IsLoggedIn, (req, res) => {
        Events.where({ display_id: req.params.eventId})
        .fetch()
        .then((event) => {
            const eventName = event.attributes.name;

            Events.where({ display_id: req.params.eventId })
            .destroy()
            return eventName;
        })
        .then((event) => {
            res.status(200).json({ message: `${event} has been deleted`});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'ERROR: could not delete event' });
        })
    })



module.exports = router;