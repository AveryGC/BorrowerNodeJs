const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require("body-parser"),
    seedDB = require('./seedDB');

const borrowerRoutes = require('./controllers/borrowerController');

mongoose.connect('mongodb+srv://admin:admin123@cluster0-dvbv1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:', err.message);
});

seedDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", borrowerRoutes);

app.listen(3000, () => {
    console.log("Server 3000 has started!");
});