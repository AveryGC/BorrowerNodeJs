const mongoose = require("mongoose");

const BorrowerDao = require('../daos/BorrowerDao'),
    CopyDao = require('../daos/CopyDao'),
    LoanDao = require('../daos/LoanDao'),
    BranchDao = require('../daos/BranchDao');

let borrowerService = {};

borrowerService.checkoutBook = async (borrowerId, branchId, bookId) => {
    //check if ids are valid
    if (!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(branchId) || !mongoose.Types.ObjectId.isValid(borrowerId)) {
        throw {
            message: "Invalid ID",
            code: "#E356"
        };
    }
    bookId = mongoose.Types.ObjectId(bookId);
    branchId = mongoose.Types.ObjectId(branchId);
    borrowerId = mongoose.Types.ObjectId(borrowerId);
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        // check if borrower exists
        if (!await BorrowerDao.exists({ _id: borrowerId })) {
            throw {
                message: "Invalid card number for borrower.",
                code: "#E784"
            };
        }
        let copies = await CopyDao.findOne({ "book": bookId, "branch": branchId }).session(session); // associates obj to session
        if (!copies) {
            throw {
                message: "Could not find any copies.",
                code: "#E784"
            };
        }
        if (!copies.amount) {
            throw {
                message: "All copies of this book are currently checked out.",
                code: "#E258"
            };
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
        await LoanDao.create([loan], { session });
        await CopyDao.updateOne(copies, { amount: copies.amount - 1 });
        await session.commitTransaction();
    } catch (err) {
        // rollback any changes made in the database
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

borrowerService.returnBook = async (loanId) => {
    if (!mongoose.Types.ObjectId.isValid(loanId)) {
        throw {
            message: "Invalid ID",
            code: "#E356"
        };
    }
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        const loan = await LoanDao.findById(mongoose.Types.ObjectId(loanId)).session(session);
        if (!loan) {
            throw {
                message: 'Loan not found.',
                code: "#E784"
            };
        }
        if (loan.dateIn) {
            throw {
                message: "Book already returned.",
                code: "#E258"
            };
        }
        await loan.updateOne({
            dateIn: new Date()
        });
        const copy = await CopyDao.findOneAndUpdate({
            book: loan.book._id,
            branch: loan.branch._id
        }, {
            $inc: {
                amount: 1
            }
        }, {
            useFindAndModify: false
        }).session(session);
        if (!copy) {
            throw {
                //unable to update copies but do not reveal to client
                code: "#E000"
            };
        }
        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

borrowerService.registerBorrower = async (name, address, phone) => {
    if (!name && !address && !phone) {
        throw {
            message: "Invalid ID",
            code: "#E356"
        };
    }
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        borrower = {
            "name": name,
            "address": address,
            "phone": phone
        };
        returned = await BorrowerDao.create([borrower], session);
        session.commitTransaction()
        return returned[0];
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

borrowerService.findLoans = async (borrowerId, pageSize, currentPage) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(borrowerId))
            throw {
                message: "Invalid ID",
                code: "#E356"
            };
        borrowerId = mongoose.Types.ObjectId(borrowerId);
        let conditions = { "borrower": borrowerId, "dateIn": null }
        let loans = await LoanDao.find(conditions).skip(pageSize * (currentPage - 1)).limit(pageSize);
        let numLoans = await LoanDao.countDocuments(conditions);
        return {loans, numLoans};
    } catch (err) {
        throw err;
    }
}

borrowerService.findBorrowers = async () => {
    try {
        let borrowers = await BorrowerDao.find();
        if (!borrowers.length) {
            throw {
                message: "No Borrowers Found.",
                code: "#E784"
            };
        }
        return borrowers;
    } catch (err) {
        throw err;
    }
}

borrowerService.findBranches = async () => {
    try {
        let branch = await BranchDao.find();
        if (!branch.length) {
            throw {
                message: "No Branches Found.",
                code: "#E784"
            };
        }
        return branch;
    } catch (err) {
        throw err;
    }
}

borrowerService.findCopiesByBranch = async (branchId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(branchId))
            throw {
                message: "Invalid ID",
                code: "#E356"
            };
        branchId = mongoose.Types.ObjectId(branchId);
        let copies = await CopyDao.find({ "branch": branchId, "amount": { $gt: 0 } });
        return copies;
    } catch (err) {
        throw err;
    }
}

borrowerService.findBorrowerById = async (borrowerId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(borrowerId))
            throw {
                message: "Invalid ID",
                code: "#E356"
            };
        borrowerId = mongoose.Types.ObjectId(borrowerId);
        let borrower = await BorrowerDao.findById(borrowerId);
        if (!borrower)
            throw {
                message: "No Borrowers Found.",
                code: "#E784"
            };
        return borrower;
    } catch (err) {
        throw err;
    }
}

module.exports = borrowerService;
