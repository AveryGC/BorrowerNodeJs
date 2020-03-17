const Copy = require('../models/Copy');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const Publisher = require('../models/Publisher');

module.exports = {
    find(branchId, query) {
        query = {
            title: query.title || '',
            skip: (Number(query.page) - 1) * Number(query.pagesize),
            limit: Number(query.pagesize)
        };
        return Copy.aggregate([
            {
                $facet: {
                    copies: [
                        { $match: { branch: branchId, amount: { $gt: 0 } } },
                        {
                            $lookup: {
                                from: 'books',
                                let: { 'book': '$book' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ['$_id', '$$book'] },
                                            title: { $regex: query.title, $options: 'i' }
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: 'authors',
                                            let: { 'authors': '$authors' },
                                            pipeline: [
                                                { $match: { $expr: { $in: ['$_id', '$$authors'] } } }
                                            ],
                                            as: 'authors'
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: 'publishers',
                                            let: { 'publisher': '$publisher' },
                                            pipeline: [
                                                { $match: { $expr: { $eq: ['$_id', '$$publisher'] } } }
                                            ],
                                            as: 'publisher'
                                        }
                                    },
                                    { $unwind: '$publisher' },
                                    {
                                        $lookup: {
                                            from: 'genres',
                                            let: { 'genres': '$genres' },
                                            pipeline: [
                                                { $match: { $expr: { $in: ['$_id', '$$genres'] } } }
                                            ],
                                            as: 'genres'
                                        }
                                    },
                                ],
                                as: 'book'
                            }
                        },
                        { $unwind: '$book' },
                        { $lookup: { from: 'branches', localField: 'branch', foreignField: '_id', as: 'branch' } },
                        { $unwind: '$branch' },
                        { $skip: query.skip },
                        { $limit: query.limit }
                    ],
                    count: [
                        { $match: { branch: branchId, amount: { $gt: 0 } } },
                        { $lookup: { from: 'books', localField: 'book', foreignField: '_id', as: 'book', as: 'book' } },
                        { $match: { 'book.title': { $regex: query.title, $options: 'i' } } },
                        { $group: { '_id': null, 'value': { $sum: 1 } } }
                    ],
                }
            },
            { $unwind: '$count' },
            {
                $project: {
                    copies: '$copies',
                    count: '$count.value'
                }
            }
        ]);
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