const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    modelsPath = path.resolve(__dirname, 'models'),
    bodyParser = require("body-parser"),
    seedDB = require('./seedDB');

const borrowerRoutes = require('./controllers/borrowerController');

mongoose.connect('mongodb+srv://admin:admin123@cluster0-dvbv1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
    fs.readdirSync(modelsPath).forEach(file => {
        require(modelsPath + '/' + file);
    });
    // seedDB();
}).catch(err => {
    console.log('ERROR:', err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use("/", borrowerRoutes);

app.listen(3000, () => {
    console.log("Server 3000 has started!");
});