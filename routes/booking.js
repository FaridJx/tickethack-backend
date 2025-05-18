var express = require('express');
var router = express.Router();
const moment = require('moment')
moment.locale('fr')
const Booking = require('../models/booking')
const Cart = require('../models/cart')


router.get('/', (req, res, next) => {
    Booking.find().then( data => {
      res.json(data)
    })
  });



router.post('/save', async (req, res) => {
    let tabBooking = await Cart.find()
    
    tabBooking.map(e => {

      const today = new Date()
      const dayTravel = new Date(e.date)
      let diffTravel = {}
  
      tmp = Math.abs(today - dayTravel)
  
      tmp = Math.floor(tmp/1000);         // Nombre de secondes entre les 2 dates
      diffTravel.sec = tmp % 60;					// Extraction du nombre de secondes
  
      tmp = Math.floor((tmp-diffTravel.sec)/60);	// Nombre de minutes (partie entière)
      diffTravel.min = tmp % 60;					// Extraction du nombre de minutes
  
      tmp = Math.floor((tmp-diffTravel.min)/60);	// Nombre d'heures (entières)
      diffTravel.hour = tmp % 24;					// Extraction du nombre d'heures
      
      tmp = Math.floor((tmp-diffTravel.hour)/24);
      diffTravel.day = tmp
  
      dayTravel < today ? diffTravel.status = "Voyage passé il y a" : diffTravel.status = "Départ dans"
  
  
      const newBooking = new Booking({
          departure: e.departure,
          arrival: e.arrival,
          date: diffTravel,
          price: e.price
      });
  
      newBooking.save()
    })
    
    Booking.find().then( data => {
      res.json(data)
    })

})

module.exports = router
