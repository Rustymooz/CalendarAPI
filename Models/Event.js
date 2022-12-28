const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    /*
    startDate: [
        {
            hour: Number,
            minute: Number
        }
    ],
    date: [
        {
            day: Number,
            month: Number,
            year: Number
        }
    ]
    */
}, {timestamps: true})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;