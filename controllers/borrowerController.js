const routes = require('express').Router(),
    service = require('../service/borrowerService.js');

routes.put('/return', async (req, res) => {
    try {
        const loanId = req.body;
        await service.returnBook(loanId);
        res.status(204).send();
    } catch (error) {
        console.log('Error: ' + err.message);
        res.status(err.code ? err.code : 500).send();
    }
});

module.exports = routes;