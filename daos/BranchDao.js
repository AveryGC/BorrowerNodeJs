const Branch = require('../models/Branch');

module.exports = {
    find(conditions) {
        return Branch.find(conditions);
    }
}