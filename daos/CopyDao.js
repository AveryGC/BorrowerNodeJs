const Copy = require('../models/Copy');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const Publisher = require('../models/Publisher');

module.exports = {
    find(conditions) {
        return Copy.find(conditions).populate({
            path: 'book', populate: [
                {
                    path: 'authors'
                },
                {
                    path: 'genres'
                },
                {
                    path: 'publisher'
                }]
        });
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