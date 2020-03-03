var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    modelsPath = path.resolve(__dirname, 'models');

mongoose.connect('mongodb+srv://admin:admin123@cluster0-dvbv1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
    fs.readdirSync(modelsPath).forEach(file => {
        require(modelsPath + '/' + file);
    });
}).catch(err => {
    console.log('ERROR:', err.message);
});