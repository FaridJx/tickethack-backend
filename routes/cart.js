var express = require('express');
var router = express.Router();
const moment = require('moment')
const Cart = require('../models/cart')


router.get('/', (req, res, next) => {
    Cart.find().then(data => {
      res.json(data)
    })
  });

router.post('/new', (req, res) => {
    if(!req.body.departure || !req.body.arrival || !req.body.date || !req.body.price ){
        res.json({result: false, error: 'Il manque un élément'})
        return
    }

    const newCart = new Cart({
        departure: req.body.departure,
        arrival: req.body.arrival,
        date: req.body.date,
        price: req.body.price
    });

    newCart.save().then(data => {
        res.json({ data: data });
      });
})


router.delete('/delete', (req, res) => {
    if(!req.body.departure || !req.body.arrival || !req.body.date){
      res.json({result: false, error: 'Il manque un élément'})
      return
    }


    Cart.deleteOne({departure: req.body.departure, arrival: req.body.arrival, date: req.body.date})
    .then(() => {
      Cart.find().then(data => {
        console.log(data);
      });
     
     })
})


router.delete('/deleteAll', (req, res) => {
    Cart.deleteMany({})
    .then(() => {
      Cart.find().then(data => {
        console.log(data);
      });
     
     })
})

module.exports = router