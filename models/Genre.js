var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Genre', genreSchema);