const Joi = require('joi');
const express = require('express');
const app = express();
const Event = require('../Models/Event');

app.use(express.json());

const events = [
    {id: 1, name: 'event1'},
    {id: 2, name: 'event2'},
    {id: 3, name: 'event3'}
]

const getAllEvents = (req, res) => {
    Event.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
    // res.send(events);
}

const getEvent = (req, res) => {
    /*
    const event = events.find(e => e.id === parseInt(req.params.id));
    if(!event) res.status(404).send('Course not found');
    res.send(event);
    */
    const result = Event.find({id: req.params.id})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
    
    //res.send(req.params.id);
}

const addEvent = (req, res) => {
    /*
    const result = validateEvent(req.body);
    if(result.error){
        console.log(req.body)
        //400 Bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    */
    const eventt = new Event(req.body);
    eventt.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
    /*
    console.log(req.body);
    const result = validateEvent(req.body);
    if(result.error){
        //400 Bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const event = {
        id: events.length + 1,
        name: req.body.name
    }
    events.push(event);
    res.send(event);
    */
}

function validateEvent(event){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        durationMinutes: Joi.number().integer(),
        description: Joi.string(5).required
    })
    
    const result = schema.validate(event);
    return result;
}

module.exports = {
    getAllEvents,
    getEvent,
    addEvent
}