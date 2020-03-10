var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loanSchema = new Schema({
    borrower: {
        type: Schema.Types.ObjectId, ref: 'Borrower',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId, ref: 'Book',
        required: true
    },
    branch: {
        type: Schema.Types.ObjectId, ref: 'Branch',
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    dateDue: {
        type: Date,
        required: true
    },
    dateIn: {
        type: Date
    }
}, { versionKey: false });

module.exports = mongoose.model('Loan', loanSchema);