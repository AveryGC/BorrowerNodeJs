const express = require("express"),
	  router  = express.Router(),
     service = require('../service/borrowerService.js');

router.post('/loans', async (req, res) => {
    try {
        await service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId)
        res.status(201);
        res.send(null);
    } catch(err) {
        res.status(404);
        res.send({error: err});
    } 
});

router.put('borrowers/:borrowId/branches/:branchId/books/:bookId', (req,resp) => {
    service.returnBook(req.param.borrowId,req.param.branchId,req.param.bookId, (error,result) => {
        if(error){

        }
        resp.status(200);
        resp.send();
    });
});

module.exports = router;
