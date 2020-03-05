const mongoose = require("mongoose");

const Copies = require('../models/Copy'),
    Loans = require('../models/Loan');

let borrowerService =  {};

borrowerService.checkoutBook = async (borrowerId, branchId, bookId) => {
    bookId = mongoose.Types.ObjectId(bookId);
    branchId = mongoose.Types.ObjectId(branchId);
    borrowerId = mongoose.Types.ObjectId(borrowerId);
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        let copies = await Copies.findOne({"book": bookId,"branch": branchId}).session(session); // associates obj to session
        if (!copies.amount) {
            throw new Error("There are currently no copies of this book in the branch.");
        }
        let dateOut = new Date();
        let dateDue = new Date();
        dateDue.setDate(dateDue.getDate() + 7);
        let loan = {
            "book": bookId,
            "branch": branchId,
            "borrower": borrowerId,
            "dateOut": dateOut,
            "dateDue": dateDue
        }; 
        await Loans.create([loan], {session});
        copies.amount--;
        await copies.save(); // no need to include session because session is alrdy associated with this obj
        await session.commitTransaction();
    } catch(err) {
        // rollback any changes made in the database
        await session.abortTransaction();
        console.log(err);
        throw err;
    } finally {
        session.endSession();
    }
}

borrowerService.returnBook = (borrowerId,branchId,bookId,cb) => {

}

module.exports = borrowerService;