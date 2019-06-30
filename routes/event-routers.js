var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var { check, validationResult } = require('express-validator');
var moment = require('moment');
moment().format();

router.get('/', function(req, res) {

    Event.find({}, function(err, events) {

        // res.json(events);
        var chunk = [];
        var chunkSize = 3;
        for (var i = 0; i < events.length; i += chunkSize) {

            chunk.push(events.slice(i, chunkSize + i));
        }

        //res.json(chunk);
        res.render('event/index', {
            chunk: chunk,
            message: req.flash('info')
        });
    });

});
//create new events
router.get('/create', function(req, res) {


    res.render('event/create', {
        errors: req.flash('errors')
    });

});


//save event to db
router.post('/create', [
    check('title').isLength({ min: 5 }).withMessage('Title should be more then 5 char '),
    check('discription').isLength({ min: 5 }).withMessage('description should be more then 5 char '),
    check('location').isLength({ min: 5 }).withMessage('location should be more then 5 char '),
    check('date').isLength({ min: 5 }).withMessage('date should be more then 5 char ')
], function(req, res) {

    var errors = validationResult(req);
    //return res.status(422).json({ errors: errors.array() });
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        return res.status(422).redirect('/events/create');
    } else {
        var newEvents = new Event({
            title: req.body.title,
            discription: req.body.discription,
            location: req.body.location,
            date: req.body.date,
            created_at: Date.now()


        });
        newEvents.save(function(err) {
            if (!err) {
                console.log('event was added');
                req.flash('info', 'The event was Created successfuly');
                res.redirect('/events');
            } else {
                console.log(err);
            }
        });
    }
});

//show single event
router.get('/:id', function(req, res) {

    Event.findOne({ _id: req.params.id }, function(err, event) {

        if (!err) {

            res.render('event/show', {
                event: event
            });
        }


    });

});


//edit route
router.get('/edit/:id', function(req, res) {

    Event.findOne({ _id: req.params.id }, function(err, event) {

        if (!err) {

            res.render('event/edit', {
                event: event,
                eventDate: moment(event.date).format('YYYY-MM-DD'),
                errors: req.flash("errors"),
                message: req.flash("info")

            });
        } else {
            console.log(err);
        }


    });
});


//update the form
router.post('/update', [
    check('title').isLength({ min: 5 }).withMessage('Title should be more then 5 char '),
    check('discription').isLength({ min: 5 }).withMessage('description should be more then 5 char '),
    check('location').isLength({ min: 5 }).withMessage('location should be more then 5 char '),
    check('date').isLength({ min: 5 }).withMessage('date should be more then 5 char ')
], function(req, res) {

    console.log(req.body);
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        return res.status(422).redirect('/events/edit/' + req.body.id);
    } else {

        //create obj
        var newfeilds = {
            title: req.body.title,
            discription: req.body.discription,
            location: req.body.location,
            date: req.body.date
        };

        var query = { _id: req.body.id };

        Event.updateOne(query, newfeilds, function(err) {
            if (!err) {
                req.flash('info', "the event was update successfuly");
                res.redirect('/events/edit/' + req.body.id);
            } else {
                console.log(err);
            }
        });
    }

});


//delete events
router.delete('/delete/:id', function(req, res) {

    console.log(req.params.id);
});

module.exports = router;