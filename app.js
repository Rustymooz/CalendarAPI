const EventControllerAPI = require('./Controllers/EventControllerAPI');
const Event = require('./Models/Event');
const Joi = require('joi');
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//PORT
const port = process.env.PORT || 3000;

const connectionString = "mongodb+srv://Rustymooz:Ou3IdvFR9lYjDYPJ@noderusty.alfotsh.mongodb.net/CalendarAPI?retryWrites=true&w=majority";
mongoose.connect(connectionString)
    .then((result) => app.listen(port, () => console.log(`Listening on port ${port}...`)))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors())

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.get('/', (req, res) => {
    res.send('Hello world');
});

// GETS
app.get('/api/events/', cors(corsOptions), EventControllerAPI.getAllEvents);
app.get('/api/events/:id', cors(corsOptions), EventControllerAPI.getEvent);
app.get('/api/eventstype/:type', cors(corsOptions), EventControllerAPI.getEventByType);
// POSTS
app.post('/api/events', cors(corsOptions), EventControllerAPI.addEvent);

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
})

// query params
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
})



app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course not found');

    
    const result = validateCourse(req.body);
    // igual á linha de cima
    const { error } = validateCourse(req.body);
    if(error /*em vez de result.error*/){
        //400 Bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(req.body);
}