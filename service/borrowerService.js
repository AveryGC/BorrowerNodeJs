const mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");
const Copies = require('../models/Copy.js');


export function checkoutBook(borrowerId, branchId, bookId, cb) {
    //begin transcation
    let trans = new Transaction();
    Copies.findOne({
        "book._id": bookId,
        "branch._id": branchId
    }).then((copies) => {
        if (copies.amount) {
            let date = new Date();
            let loan = {
                "book": bookId,
                "branch": branchId,
                "borrower": borrowerId,
                "dataOut": date,
                "dateDue": date.addDays(14),
            }
            trans.insertOne('Loan', loan);
            copies.amount--;
            trans.update('Copy', copies._id, copies)
            trans.run();
            cb(null);
        } else {
            throw "There are currently no copies of this book in the branch.";
        }
    }).catch((err) => {
        console.log(err);
        trans.rollback();
        cb(err);
    });     
}

export function returnBook(borrowerId,branchId,bookId,cb){

}