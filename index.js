var express  = require('express'),
    app      = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin123@cluster0-dvbv1.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to DB!');
    }).catch(err => {
        console.log('ERROR:', err.message);
    });


app.listen(3000, () => {
    console.log("Server 3000 has started!");
});