const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:boubou92@cluster0.xnpa1t3.mongodb.net/trips';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));