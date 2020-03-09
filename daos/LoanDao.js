const Loan = require('../models/Loan');

module.exports = {
    create(params, options) {
        return Loan.create(params, options);
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