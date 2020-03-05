const express = require("express"),
	  router  = express.Router(),
     service = require('../service/borrowerService.js');

router.post('/loans', async (req, res) => {
    try {
        await service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId);
        res.status(201);
        res.send();
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

router.get('/borrowers/', async(req,resp) =>{
    try{
        let borrowers = await service.findBorrowers();
        resp.status(200).send(borrowers);
    }catch(err){
        resp.status(404).send({error: err});
    }
})

router.get('/borrowers/:id/loans', async (req,resp)=>{
    if(req.params.id.length!=24)
        return resp.status(400).send();
    try{
        let loans = await service.findLoans(req.params.id);
        resp.status(200).send(loans);
    }catch(err){
        resp.status(404).send({error: err});
    }
})

router.get('/branches', async (req,resp)=>{
    try{
        let branches = await service.findBranches();
        resp.status(200).send(branches);
    }catch(err){
        resp.status(404).send({error: err});
    }

})

router.get('/branches/:id/copies', async (req, resp) =>{
    try{
        if(new String(req.params.id).length!=24)
            return resp.status(400).send();
        let copies = await service.findCopiesByBranch(req.params.id);
        resp.status(200).send(copies);
    }catch(err){
        resp.status(404).send({error:err});
    }
})

router.get('copies')

module.exports = router;
