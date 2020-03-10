var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var borrowerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    loans: [{
        type: Schema.Types.ObjectId, ref: 'Loan'
    }]
}, { versionKey: false });

module.exports = mongoose.model('Borrower', borrowerSchema);