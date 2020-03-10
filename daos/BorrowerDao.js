const Borrower = require('../models/Borrower');

module.exports = {
    find(conditions) {
        return Borrower.find(conditions);
    },
    exists(filter) {
        return Borrower.exists(filter);
    }
}