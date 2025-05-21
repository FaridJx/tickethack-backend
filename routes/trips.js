var express = require('express');
var router = express.Router();
const moment = require('moment')
moment.locale('fr')
const Trip = require('../models/trips')

router.get('/', (req, res, next) => {
  Trip.find().then(data => {
    res.json({trips: data})
  })
});


router.post('/selec', (req, res) => {
    if(!req.body.departure || !req.body.arrival || !req.body.date ){
        res.json({result: false, error: 'Il manque un élément'})
        return
    }
    
    const inputDate = moment(req.body.date).format('YYYY-MM-DD 00:00:00');
    
    const nextDay = new Date(inputDate);
    
    nextDay.setDate(nextDay.getDate() + 1);

    Trip.find({departure: req.body.departure, arrival: req.body.arrival, date: { $gte: inputDate, $lt: nextDay}}).then(data => {
        if (data && data.length > 0) {
            // Formatez les dates dans le format souhaité (par exemple, 'YYYY-MM-DD')
            const formattedData = data.map(trip => ({
                departure: trip.departure,
                arrival: trip.arrival,
                date: moment(trip.date).format('LLL'), // Remplacez 'YYYY-MM-DD' par le format désiré
                price: trip.price,
            }));

            res.json({ data: formattedData });
        } else {
            res.json({ result: false, error: `Ce trajet n'est pas disponible` });
        }
    })

})



module.exports = router;
