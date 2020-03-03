var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var borrowerSchema = new Schema({
    cardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    loans: [{
        type: Schema.Types.ObjectId, ref: 'Publisher'
    }]
});

mongoose.model('Borrower', borrowerSchema);