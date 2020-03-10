const Loan = require('../models/Loan');

module.exports = {
    create(properties, options) {
        return Loan.create(properties, options);
    },
    find(conditions) {
        return Loan.find(conditions);
    },
    findById(id) {
        return Loan.findById(id);
    },
    updateOne(conditions, update) {
        return Loan.updateOne(conditions, update);
    }
}