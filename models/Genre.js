var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('Genre', genreSchema);