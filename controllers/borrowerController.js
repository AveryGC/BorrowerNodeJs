const router = require("express").Router(),
    service = require('../service/borrowerService.js');

router.post('/loans', async (req, res) => {
    try {
        await service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId);
        res.status(201);
        res.send(null);
    } catch (err) {
        res.status(404);
        res.send({ error: err });
    }
});

router.put('/loans', async (req, res) => {
    try {
        await service.returnBook(req.body.loanId);
        res.status(204).send();
    } catch (err) {
        console.log(err.message);
        let status = err.status ? err.status : 500;
        res.status(status).send({
            error: {
                status: status,
                message: err.message
            }
        });
    }
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
