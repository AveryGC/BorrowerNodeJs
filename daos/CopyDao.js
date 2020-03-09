const Copy = require('../models/Copy');

module.exports = {
    find(conditions) {
        return Copy.find(conditions);
    },
    findOne(conditions) {
        return Copy.findOne(conditions);
    },
    findOneAndUpdate(conditions, update, options) {
        return Copy.findOneAndUpdate(conditions, update, options);
    },
    updateOne(conditions, update) {
        return Copy.updateOne(conditions, update);
    }
}