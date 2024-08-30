const mongoose = require('mongoose');
const { mongoURI, database } = require('./env');
const { initModels } = require('../models/init_models');

// Connect to MongoDB
mongoose.connect(mongoURI + database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
let models = initModels(mongoose);

module.exports = { models };