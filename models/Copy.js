var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var copySchema = new Schema({
    book: {
        type: Schema.Types.ObjectId, ref: 'Book',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

mongoose.model('Copy', copySchema);