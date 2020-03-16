const Loan = require('../models/Loan');

module.exports = {
    create(properties, options) {
        return Loan.create(properties, options);
    },
    find(conditions) {
        return Loan.find(conditions).populate([
            {
                path: 'book'
            },
            {
                path: 'branch'
            }
        ]);
    },
    findById(id) {
        return Loan.findById(id);
    },
    updateOne(conditions, update) {
        return Loan.updateOne(conditions, update);
    }
}