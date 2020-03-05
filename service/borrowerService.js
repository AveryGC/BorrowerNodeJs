const mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");

const Loan = require('../models/Loan');
const Copy = require('../models/Copy');

module.exports = {
    async returnBook(loanId) {
        let transaction = new Transaction();
        const loan = await Loan.findById(loanId);
        if (!loan) {
            transaction.rollback();
            throw new Error({
                message: 'Loan not found.',
                code: 404
            });
        }
        if (loan.dateDue < new Date()) {
            transaction.rollback();
            throw new Error({
                message: "Loan due date already passed.",
                code: 400
            });
        }
        loan.dateIn = new Date();
        loan.update();
        const copy = await Copy.findOneAndUpdate({
            'book._id': loan.book._id,
            'branch._id': loan.branch._id
        }, {
            $inc: {
                amount: 1
            }
        });
        if (!copy) {
            transaction.rollback();
            throw new Error({
                message: "Copy not found",
                code: 404
            });
        }
        console.log(copy);
        transaction.commit();
    }
};