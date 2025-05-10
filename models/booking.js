const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Object,
    price: Number
})

const Booking = mongoose.model('bookings', bookingSchema)
module.exports = Booking