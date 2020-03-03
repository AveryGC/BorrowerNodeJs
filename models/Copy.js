var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var copySchema = new Schema({
    book: {
        type: Schema.Types.ObjectId, ref: 'Book',
        required: true
    },
    branch: {
        type: Schema.Types.ObjectId, ref: 'Branch',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Copy', copySchema);