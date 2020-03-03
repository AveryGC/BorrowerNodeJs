var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    copies: [{ type: Schema.Types.ObjectId, ref: 'Copy', }],
    borrowers: [{ type: Schema.Types.ObjectId, ref: 'Borrower', }]
});

module.exports = mongoose.model('Branch', branchSchema);