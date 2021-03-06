const express = require('express');
const IsLoggedIn = require('./../middleware/IsLoggedIn');
const { v4: uuidv4 } = require('uuid');
const Business = require('./../models/businesses');
const router = express.Router();

// get a single businesses with all related events
router
    .route('/')
    .get(IsLoggedIn, (req, res) => {
        const displayId = req.session.passport.user;
        Business.where({ display_id: displayId})
        .fetchAll({ withRelated: ['events']})
        .then((businesses) => {
            res.status(200).json(businesses);
        })
        .catch(() => 
        res.status(400).json({ message: "ERROR: cannot fetch businesses data"})
        );
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
            postal_code: req.body.postal_code,
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
            console.log(err);
            res.status(400).json({ message: 'ERROR: cannot create new business profile'});
        });
    });

// edit existing business profile
router
    .route('/:businessId')
    .put(IsLoggedIn, (req, res) => {
        console.log(req.body.updatedBusinessInfo);
        Business.where({ display_id: req.params.businessId})
        .fetch()
        .then((business) => {
            business
                .save({
                    name: req.body.updatedBusinessInfo.name,
                    address: req.body.updatedBusinessInfo.address,
                    address_two: req.body.updatedBusinessInfo.address_two,
                    city: req.body.updatedBusinessInfo.city,
                    province: req.body.updatedBusinessInfo.province, 
                    postal_code: req.body.updatedBusinessInfo.postal_code,
                    country: req.body.updatedBusinessInfo.country,
                    latitude: req.body.updatedBusinessInfo.latitude,
                    longitude: req.body.updatedBusinessInfo.longitude
                })
                .then((updatedBusiness) => {
                    // console.log(req.body)
                    res.status(200).json(updatedBusiness);
                })
        })
        .catch(()=> {
            res.status(400).json({ message: 'ERROR: cannot update business profile'})
        });
    });

router
    .route('/:businessId')
    .delete(IsLoggedIn, (req, res) => {
        Business.where({ display_id: req.params.businessId})
            .fetch({ withRealed: ['events'] })
            .then((business) => {
                const name = business.attributes.name;

                Business.where({ display_id: req.params.businessId})
                .destroy()
                res.status(200).json({ message: `${name} profile has been deleted ` })
            })
            .catch((err) => {
                res.status(400).json({ message: 'ERROR: could not delete business profile'})
            });
    });

module.exports = router;