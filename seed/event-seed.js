var db = require('../config/database');
var Event = require('../models/Event');


var newEvent = [
    new Event({
        title: ' THis is page title1',
        discription: 'Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting thing',
        location: 'microsoft1',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: ' THis is page title2',
        discription: 'Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting thing',
        location: 'microsoft2',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: ' THis is page title3',
        discription: 'Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting thing',
        location: 'microsoft3',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: ' THis is page title4',
        discription: 'Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting thing',
        location: 'microsoft4',
        date: Date.now(),
        created_at: Date.now()
    }), new Event({
        title: ' THis is page title5',
        discription: 'Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting thing',
        location: 'microsoft5',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: ' THis is page title6',
        discription: 'Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting thing',
        location: 'microsoft6',
        date: Date.now(),
        created_at: Date.now()
    })

];


newEvent.forEach(function(Event) {

    Event.save(function(err) {
        if (err) {
            console.log(err);
        }
    });
});


// var newEvent = new Event({

//     title: ' THis is page title',
//     discription: 'ant thing',
//     location: 'egypt',
//     date: Date.now()
// });


// newEvent.save(function(err) {

//     if (!err) {
//         console.log('record was added');
//     } else {
//         console.log(err);
//     }
// });