const express = require('express');
const IsLoggedIn = require('./../middleware/IsLoggedIn');
const { v4: uuidv4 } = require('uuid');
const Business = require('./../models/businesses');
const Events = require('./../models/events');
const Bookshelf = require('./../bookshelf');
const router = express.Router();

// get all events with related business
router
    .route('/')
    .get((req, res) => {
        Events.query(function(qb) {
            qb.whereRaw('end_time >  NOW()').andWhereRaw('end_time < ADDDATE(NOW(), INTERVAL 3 DAY)')
            console.log(qb.toSQL())
        })
        .fetchAll({ withRelated: [{'businesses': function(qb) {
            qb.column('id', 'latitude', 'longitude', 'name', 'address', 'city', 'province');
            }}] 
        })
        .then((events) => {
            console.log(events);
            const eventsArray = events.models;
            const businessIdRemoved = [];

            // delete business id from fetched object
            for (let i=0; i< eventsArray.length; i++) {
                delete eventsArray[i]['attributes']['business_id']
                delete eventsArray[i]['relations']['businesses']['attributes']['id'];
                businessIdRemoved.push(eventsArray[i]);
            }
            res.status(200).json(businessIdRemoved);
            // res.json(events);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'ERROR: cannot fetch events data' });
        });
    });


// get a single event by 
router
    .route('/:eventId')
    .get((req, res) => {
        Events.where({ display_id: req.params.eventId})
        .fetch()
        .then((event) => {
            delete event.attributes['business_id'];
            console.log(event);
            res.status(200).json(event);
        })
        .catch(() => {
            res.status(400).json({ message: "ERROR: cannot fetch event data"})
        });
    });


// create a new event
router
    .route('/')
    .post(IsLoggedIn, (req, res) => {
        const businessDisplayId = req.session.passport.user;
        Business.where({ display_id: businessDisplayId})
        // Business.where({ id: req.body.business_id})
        .fetch()
        .then((business)=> {
            // console.log(business)
            new Events({
                display_id: uuidv4(),
                business_id: business.id,
                name: req.body.event.name,
                start_time: req.body.event.start_time,
                end_time: req.body.event.end_time,
                description: req.body.event.description,
                restrictions: req.body.event.restrictions,
                fee: req.body.event.fee,
                image: req.body.event.image,
                category: req.body.event.category
                // business_id: req.body.business_id,
                // name: req.body.name,
                // start_time: req.body.start_time,
                // end_time: req.body.end_time,
                // description: req.body.description,
                // restrictions: req.body.restrictions,
                // fee: req.body.fee,
                // image: req.body.image,
                // category: req.body.category
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
        // console.log(req.body.updatedEvent);
        Events.where({ display_id: req.params.eventId})
        .fetch()
        .then((event) => {
            event
                .save({
                    name: req.body.updatedEvent.name,
                    start_time: req.body.updatedEvent.start_time,
                    end_time: req.body.updatedEvent.end_time,
                    description: req.body.updatedEvent.description,
                    restrictions: req.body.updatedEvent.restrictions,
                    fee: req.body.updatedEvent.fee,
                    image: req.body.updatedEvent.image,
                    category: req.body.updatedEvent.category
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