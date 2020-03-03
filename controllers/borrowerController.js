let routes = require('express').Router();
let service = require('service\borrowerService.js');

//change

routes.post('borrowers/:borrowId/branches/:branchId/books/:bookId',function(req,resp){
    service.checkoutBook(req.param.borrowId,req.param.branchId,req.param.bookId,function(error,result){
        if(error){
            resp.status();
            resp.send();
        }
        resp.status(201);
        resp.send(result);
    })
})

routes.put('borrowers/:borrowId/branches/:branchId/books/:bookId',function(req,resp){
    service.returnBook(req.param.borrowId,req.param.branchId,req.param.bookId,function(error,result){
        if(error){

        }
        resp.status(200);
        resp.send();
    })
})

module.exports.routes;