const Author  = require('./models/Author'),
    Book      = require('./models/Book'),
    Borrower  = require('./models/Branch'),
    Branch    = require('./models/Branch'),
    Copy      = require('./models/Copy'),
    Genre     = require('./models/Genre'),
    Loan      = require('./models/Loan'),
    Publisher = require('./models/Publisher');

let authors = [
    {
        name: "Author1"
    },
    {
        name: "Author2"
    },
    {
        name: "Author3"
    }
];

let publishers = [
    {
        name: "Publisher1"
    },
    {
        name: "Publisher2"
    },
    {
        name: "Publisher3"
    }
];

let borrowers = [
    {
        name: "Borrower1"
    },
    {
        name: "Borrower2"
    },
    {
        name: "Borrower3"
    }
];

let genres = [
    {
        name: "Genre1"
    },
    {
        name: "Genre2"
    },
    {
        name: "Genre3"
    }
];

let branches = [
    {
        name: "Branch1",
        address: "Address1"
    },
    {
        name: "Branch2",
        address: "Address2"
    },
    {
        name: "Branch3",
        address: "Address3"
    }
];

function seedDB() {
    Author.remove({}, err => {
        authors.forEach(author => {
            Author.create(author, (err, createdAuthor) => {
                console.log(createdAuthor);
                author._id = createdAuthor._id;
                console.log(1);
            });
        });
    });

    Publisher.remove({}, err => {
        publishers.forEach(publisher => {
            Publisher.create(publisher, (err, createdPublisher) => {
                publisher._id = createdPublisher._id;
            });
        });
    });

    Borrower.remove({}, err => {
        borrowers.forEach(borrower => {
            Borrower.create(borrower, (err, createdBorrower) => {
                borrower._id = createdBorrower._id;
            });
        });
    });

    Genre.remove({}, err => {
        genres.forEach(genre => {
            Genre.create(genre, (err, createdGenre) => {
                genre._id = createdGenre._id;
            });
        });
    });

    let books = [
        {
            title: "Book1",
            publisher: publishers[0]._id,
            authors: [authors[0]._id, authors[1]._id],
            genres: [genres[0]._id, genres[1]._id]
        },
        {
            title: "Book2",
            publisher: publishers[1]._id,
            authors: [authors[1]._id, authors[2]._id],
            genres: [genres[1]._id, genres[2]._id]
        },
        {
            title: "Book3",
            publisher: publishers[2]._id,
            authors: [authors[2]._id],
            genres: [genres[2]._id]
        }
    ];

    Book.remove({}, err => {
        books.forEach(book => {
            Book.create(book, (err, createdBook) => {
                console.log(err);
                book._id = createdBook._id;
            });
        });
    });

    Branch.remove({}, err => {
        branches.forEach(branch => {
            Branch.create(branch, (err, createdBranch) => {
                branch._id = createdBranch._id;
            });
        });
    });

    let copies = [
        {
            book: books[0]._id,
            branch: branches[0]._id,
            amount: 3
        },
        {
            book: books[1]._id,
            branch: branches[1]._id,
            amount: 3
        },
        {
            book: books[2]._id,
            branch: branches[2]._id,
            amount: 3
        }
    ];

    Copy.remove({}, err => {
        copies.forEach(copy => {
            Copy.create(copy, (err, createdCopy) => {
                copy._id = createdCopy._id;
            });
        });
    });
}

module.exports = seedDB;