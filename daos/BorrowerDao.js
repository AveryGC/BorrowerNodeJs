const Borrower = require('../models/Borrower');

module.exports = {
    find(conditions) {
        return Borrower.find(conditions);
    },
    findById(id) {
        return Borrower.findById(id);
    },
    exists(filter) {
        return Borrower.exists(filter);
    }
}