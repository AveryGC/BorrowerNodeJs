const router = require("express").Router(),
    service = require('../service/borrowerService.js');

router.post('/loans', async (req, res) => {
    try {
        await service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId)
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

module.exports = router;
