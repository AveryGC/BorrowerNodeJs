const mongoose = require("mongoose");

const Copies = require('../models/Copy'),
    Branches = require('../models/Branch')
    Loans = require('../models/Loan');
    Borrowers = require('../models/Borrower')

let borrowerService = {};

borrowerService.checkoutBook = async (borrowerId, branchId, bookId) => {
    bookId = mongoose.Types.ObjectId(bookId);
    branchId = mongoose.Types.ObjectId(branchId);
    borrowerId = mongoose.Types.ObjectId(borrowerId);
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        let copies = await Copies.findOne({ "book": bookId, "branch": branchId }).session(session); // associates obj to session
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
        await Loans.create([loan], { session });
        copies.amount--;
        await copies.save(); // no need to include session because session is alrdy associated with this obj
        await session.commitTransaction();
    } catch (err) {
        // rollback any changes made in the database
        await session.abortTransaction();
        console.log(err);
        throw err;
    } finally {
        session.endSession();
    }
}

borrowerService.returnBook = async (loanId) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        const loan = await Loans.findById(mongoose.Types.ObjectId(loanId));
        if (!loan) {
            throw {
                message: 'Loan not found.',
                status: 404
            };
        }
        if (loan.dateIn) {
            throw {
                message: "Book already returned.",
                status: 400
            };
        }
        await loan.updateOne({
            dateIn: new Date()
        });
        const copy = await Copies.findOneAndUpdate({
            book: loan.book._id,
            branch: loan.branch._id
        }, {
            $inc: {
                amount: 1
            }
        }, {
            useFindAndModify: false
        });
        if (!copy) {
            throw {
                //unable to update copies but do not reveal to client
                status: 500
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

borrowerService.findLoans = async (borrowerId) =>{
    try{
        borrowerId = mongoose.Types.ObjectId(borrowerId);
        let loan = await Loans.find({"borrower" : borrowerId}).exec();
        if(loan==null){
            console.log("no loans found");
            throw err("no loans found");
        }
        return loan;
    }catch(err){
        console.log(err);
        throw err;
    }
}

borrowerService.findBorrowers = async () =>{
    try{
        let borrowers = await Borrowers.find().exec();
        if(borrowers == null)
            throw err("no borrowers in system");
        return borrowers;
    }catch(err){
        console.log(err);
        throw err;
    }
}

borrowerService.findBranches = async () =>{
    try{
        let branch = await Branches.find();
        if (branch==null)
            throw err("no branches found")
        return branch;
    }catch(err){
        console.log(err);
        throw err;
    }
}

borrowerService.findCopiesByBranch = async (branchId) =>{
    try{
        branchId = mongoose.Types.ObjectId(branchId);
        let copys = await Copies.find({ branch : branchId}).exec();
        if(copys){
            return copys;
        }else
            throw new error("No Copies Found!!!");
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports = borrowerService;