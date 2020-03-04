const mongoose = require('mongoose');
const Transaction = require("mongoose-transactions");


export function checkoutBook(borrowerId,branchId,bookId,cb){
    let copiesDao= mongoose.model("copiesSchema",copiesSchema);
    //begin transcation
    trans = new Transaction();
    {
        //call to dao to get bookcopies
        copiesDao.findOne({"book._id":bookId,"branch._id":branchId},function(error1,copies){
            if(error1)
                cb(error1,null);
            if(copies.amount>0){
                //make call to DAO to update
                let date= new Date();
                loan = {"book":bookId, "branch":branchId,"borrower":borrowerId, "dateOut": date.now(), "dateDue":date.addDays(14)}
                trans.insertOne(loanSchema, loan ,function(error2,loan){
                    if(error2){
                        trans.rollback();
                        cb(error2,null)
                    }
                    copies.amount=copies.amount-1;
                    trans.update(copiesSchema, result1._id, result1, function(error3,result3){
                        if(error3){
                            trans.rollback();
                            cb(error3,null)
                        }
                        ////checkout was succeful
                        trans.run();
                        cb(null,loan)
                    })
                })
            }else
                throw "Not Enough Books";
        })
    }
}

export function returnBook(borrowerId,branchId,bookId,cb){

}