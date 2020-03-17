const Copy = require('../models/Copy');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const Publisher = require('../models/Publisher');

module.exports = {
    find(branchId, skip, limit) {
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
                                    { $match: { $expr: { $eq: ['$_id', '$$book'] } } },
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
                        { $skip: skip },
                        { $limit: limit }
                    ],
                    count: [
                        { $match: { branch: branchId, amount: { $gt: 0 } } },
                        {
                            $group: {
                                "_id": null,
                                "value": { $sum: 1 }
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    copies: '$copies',
                    count: { $arrayElemAt: ['$count', 0] }
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