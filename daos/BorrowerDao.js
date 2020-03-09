const Borrower = require('../models/Borrower');

module.exports = {
    find(conditions) {
        return Borrower.find(conditions);
    },
    exists(params) {
        return Borrower.exists(params);
    }
}