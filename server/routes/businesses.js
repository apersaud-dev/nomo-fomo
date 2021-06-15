const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Business = require('./../models/businesses');
const router = express.Router();

// get all businesses with related events
router
    .route('/')
    .get((req, res) => {
        Business.fetchAll({ withRelated: ['events']})
        .then((businesses) => {
            res.status(200).json(businesses);
        })
        .catch(() => 
        res.status(400).json({ message: "ERROR: cannot fetch businesses data"})
        );
    });

// get a single business by id
router
    .route('/:id')
    .get((req, res) => {
        Business.where({ display_id: req.params.id})
        .fetch({ withRelated: ['events'] })
        .then((business) => {
            res.status(200).json(business);
            // res.json(req.params);
        })
        .catch(() => {
            res.status(400).json({ message: 'ERROR: cannot fetch business data'});
        })
    });

// create a new business profile
router
    .route('/')
    .post((req, res) => {
        new Business({
            display_id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            province: req.body.province,
            postal_code: req.body.postal,
            country: req.body.country,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        .save()
        .then((newBusiness) => {
            console.log(newBusiness);
            res.status(201).json(newBusiness);
        })
        .catch((err) => {
            // console.log(err);
            // res.json(err);
            res.status(400).json({ message: 'ERROR: cannot create new business profile'});
        });
    });

// edit existing business profile
router
    .route('/:id')
    .put((req, res) => {
        Business.where({ display_id: req.params.id})
        .fetch()
        .then((business) => {
            business
                .save({
                    name: req.body.name,
                    address: req.body.address,
                    city: req.body.city,
                    province: req.body.province, 
                    postal_code: req.body.postal,
                    country: req.body.country,
                })
                .then((updatedBusiness) => {
                    console.log(req.body)
                    res.status(200).json(updatedBusiness);
                })
        })
        .catch(()=> {
            res.status(400).json({ message: 'ERROR: cannot update business profile'})
        });
    });

router
    .route('/:id')
    .delete((req, res) => {
        Business.where({ display_id: req.params.id})
            .destroy()
            .then(()=> {
                res.status(200).json({ message: '${} Business Profile has been deleted' });
            })
            .catch(() => {
                res.status(400).json({ message: 'ERROR: could not delete business profile'})
            });
    });

module.exports = router;