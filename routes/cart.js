var express = require('express');
var router = express.Router();
const Cart = require('../models/cart')

// Recupère tous les voyages enregistrés 

router.get('/', (req, res, next) => {
    Cart.find().then(data => {
      res.json(data)
    })
  });

// Créer un nouveau voyage dans la page panier

router.post('/new', (req, res) => {
    if(!req.body.departure || !req.body.arrival || !req.body.date || !req.body.price ){
        res.json({result: false, error: 'Il manque un élément'})
        return
    }

    Cart.findOne({departure: req.body.departure, arrival: req.body.arrival, date: req.body.date, price: req.body.price})
    .then(data => {
      if(data === null){
        const newCart = new Cart({
            departure: req.body.departure,
            arrival: req.body.arrival,
            date: req.body.date,
            price: req.body.price
        });
    
        newCart.save().then(data => {
            res.json({ result: true, data: data });
          });
      } else {
        res.json({ result: false, error: 'Le trajet à déjà été ajouté au panier' });
      }
    })
})


// Supprime un trajet spécifique

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


// Supprime tous les trajets

router.delete('/deleteAll', (req, res) => {
    Cart.deleteMany({})
    .then(() => {
      Cart.find().then(data => {
        console.log(data);
      });
     
     })
})

module.exports = router