var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loanSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId, ref: 'Book',
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    }
});

mongoose.model('Loan', loanSchema);