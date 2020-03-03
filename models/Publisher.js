var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var publisherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: String
});

mongoose.model('Publisher', publisherSchema);