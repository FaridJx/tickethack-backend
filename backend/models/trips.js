const mongoose = require('mongoose')

const tripSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date
})

const Trip = mongoose.model('trips', tripSchema)
module.exports = Trip