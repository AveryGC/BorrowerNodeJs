const router = require("express").Router(),
    convert = require('xml-js'),
    service = require('../service/borrowerService.js');

// Checkout book
router.post('/loans', async (req, res) => {
    try {
        await service.checkoutBook(req.body.borrowerId, req.body.branchId, req.body.bookId);
        res.status(201).send();
    } catch (err) {
        if (err.code == "#E258")
            res.status(409);
        else if (err.code == "#E784")
            res.status(404);
        else if (err.code == "#E356")
            res.status(400);
        //default error is server error
        else
            res.status(500);
        res.send(err.message);
    }
});

// Return book
router.put('/loans', async (req, res) => {
    try {
        await service.returnBook(req.body.loanId);
        res.status(204).send();
    } catch (err) {
        if (err.code == "#E258")
            res.status(409);
        else if (err.code == "#E784")
            res.status(404);
        else if (err.code == "#E356")
            res.status(400);
        //default error is server error
        else
            res.status(500);
        res.send(err.message);
    }
});

// Read all borrowers
router.get('/borrowers', async (req, res) => {
    try {
        let borrowers = await service.findBorrowers();
        res.status(200);
        res.format({
            json: () => {
                res.send(borrowers)
            },
            xml: () => {
                let xmlData = "<borrowers>";
                borrowers.forEach(borrower => {
                    let tempBorrower = borrower.toObject();
                    tempBorrower._id = tempBorrower._id.toString();
                    xmlData += "<borrower>"
                    let result = convert.js2xml(tempBorrower, { compact: true });
                    xmlData += result;
                    xmlData += "</borrower>"
                });
                xmlData += "</borrowers>";
                res.send(xmlData);
            }
        });
    } catch (err) {
        if (err.code == "#E784")
            res.status(404);
        else
            res.status(500);
        res.send(err.message);
    }
});

//Read Borrower By Id
router.get('/borrowers/:id', async (req, res) => {
    try {
        let borrower = await service.findBorrowerById(req.params.id);
        res.status(200);
        res.format({
            json: () => {
                res.send(borrower)
            },
            xml: () => {
                let tempBorrower = borrower.toObject();
                tempBorrower._id = tempBorrower._id.toString();
                let xmlData = "<borrower>"
                let result = convert.js2xml(tempBorrower, { compact: true });
                xmlData += result;
                xmlData += "</borrower>"
                res.send(xmlData);
            }
        });
    } catch (err) {
        if (err.code == "#E356")
            res.status(400);
        else if (err.code == "#E784")
            res.status(404);
        else
            res.status(500);
        res.send(err.message);
    }
})

// Read all loans for a specific borrower
router.get('/borrowers/:id/loans', async (req, res) => {
    try {
        let loans = await service.findLoans(req.params.id);
        res.status(200);
        res.format({
            json: () => {
                res.send(loans)
            },
            xml: () => {
                let xmlData = "<loans>";
                loans.forEach(loan => {
                    let tempLoan = loan.toObject();
                    tempLoan._id = tempLoan._id.toString();
                    tempLoan.borrower = tempLoan.borrower.toString()
                    tempLoan.book = tempLoan.book.toString();
                    tempLoan.branch = tempLoan.branch.toString();
                    tempLoan.dateOut = tempLoan.dateOut.toString();
                    tempLoan.dateDue = tempLoan.dateDue.toString();
                    tempLoan.dateIn = tempLoan.dateIn ? tempLoan.dateIn.toString() : null;
                    xmlData += "<loan>"
                    let result = convert.js2xml(tempLoan, { compact: true });
                    xmlData += result;
                    xmlData += "</loan>"
                });
                xmlData += "</loans>";
                res.send(xmlData);
            }
        });
    } catch (err) {
        if (err.code == "#E356")
            res.status(400);
        else if (err.code == "#E784")
            res.status(404);
        else
            res.status(500);
        res.send(err.message);
    }
});

// Read all branches
router.get('/branches', async (req, res) => {
    try {
        let branches = await service.findBranches();
        res.status(200);
        res.format({
            json: () => {
                res.send(branches)
            },
            xml: () => {
                let xmlData = "<branches>";
                branches.forEach(branch => {
                    let tempBranch = branch.toObject();
                    tempBranch._id = tempBranch._id.toString();
                    xmlData += "<branch>"
                    let result = convert.js2xml(tempBranch, { compact: true });
                    xmlData += result;
                    xmlData += "</branch>"
                });
                xmlData += "</branches>";
                res.send(xmlData);
            }
        });
    } catch (err) {
        if (err.code == "#E784")
            res.status(404);
        else
            res.status(500);
        res.send(err.message);
    }
});

// Read all book copies in a specific branch
router.get('/branches/:id/copies', async (req, res) => {
    try {
        let copies = await service.findCopiesByBranch(req.params.id);
        res.status(200);
        res.format({
            json: () => {
                res.send(copies)
            },
            xml: () => {
                let xmlData = "<copies>";
                copies.forEach(copy => {
                    let tempCopy = copy.toObject();
                    tempCopy._id = tempCopy._id.toString();
                    tempCopy.book = tempCopy.book.toString();
                    tempCopy.branch = tempCopy.branch.toString();
                    xmlData += "<copy>"
                    let result = convert.js2xml(tempCopy, { compact: true });
                    xmlData += result;
                    xmlData += "</copy>"
                });
                xmlData += "</copies>";
                res.send(xmlData);
            }
        });
    } catch (err) {
        if (err.code == "#E356")
            resp.status(400);
        else if (err.code == "#E784")
            resp.status(404);
        else
            resp.status(500);
        res.send(err.message);
    }
});

module.exports = router;