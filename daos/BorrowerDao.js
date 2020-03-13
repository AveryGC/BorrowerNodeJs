const Borrower = require('../models/Borrower');

module.exports = {
    create(properties, options) {
        return Borrower.create(properties, options);
    },
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