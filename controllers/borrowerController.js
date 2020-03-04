const routes = require('express').Router(),
     service = require('../service/borrowerService.js');

routes.post('loans', (req, res) => {
    service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId, (err) => {
        if (err) {
            res.status(404);
            res.send({error: err});
        } else {
             res.status(201);
             res.send(null);
        }
    });
});

routes.put('borrowers/:borrowId/branches/:branchId/books/:bookId', (req,resp) => {
    service.returnBook(req.param.borrowId,req.param.branchId,req.param.bookId, (error,result) => {
        if(error){

        }
        resp.status(200);
        resp.send();
    });
});

module.exports = routes;
