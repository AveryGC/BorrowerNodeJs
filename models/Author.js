var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Author', authorSchema);