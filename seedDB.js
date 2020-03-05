const Author = require('./models/Author'),
    Book = require('./models/Book'),
    Borrower = require('./models/Borrower'),
    Branch = require('./models/Branch'),
    Copy = require('./models/Copy'),
    Genre = require('./models/Genre'),
    Loan = require('./models/Loan'),
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
        name: "Publisher1",
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

async function seedDB() {
    await Author.remove({});
    for (let i = 0; i < authors.length; i++) {
        const author = await Author.create(authors[i]);
        console.log('author: ' + author._id);
        authors[i]._id = author._id;
    }
    await Publisher.remove({});
    for (let i = 0; i < publishers.length; i++) {
        const publisher = await Publisher.create(publishers[i]);
        console.log('publisher: ' + publisher._id);
        publishers[i]._id = publisher._id;
    }
    await Genre.remove({});
    for (let i = 0; i < genres.length; i++) {
        const genre = await Genre.create(genres[i]);
        console.log('genre: ' + genre._id);
        genres[i]._id = genre._id;
    }
    await Borrower.remove({});
    for (let i = 0; i < borrowers.length; i++) {
        const borrower = await Borrower.create(borrowers[i]);
        console.log('borrower: ' + borrower._id);
        borrowers[i]._id = borrower._id;
    }
    await Book.remove({});
    for (let i = 0; i < books.length; i++) {
        const book = await Book.create({
            title: books[i].title,
            publisher: publishers[i],
            authors: authors,
            genres: genres
        });
        console.log('book: ' + book._id);
        books[i]._id = book._id;
    }
    await Branch.remove({});
    for (let i = 0; i < branches.length; i++) {
        const branch = await Branch.create(branches[i]);
        console.log('branch: ' + branch._id);
        branches[i]._id = branch._id;
    }
    await Copy.remove({});
    for (let i = 0; i < copies.length; i++) {
        const copy = await Copy.create({
            book: books[i],
            branch: branches[i],
            amount: copies[i].amount
        });
        console.log('copy: ' + copy._id);
        copies[i]._id = copy._id;
    }
    await Loan.remove({});
    for (let i = 0; i < copies.length; i++) {
        const loan = await Loan.create({
            borrower: borrowers[i],
            book: books[i],
            branch: branches[i],
            dateOut: new Date(),
            dateDue: new Date(Date.now() + 6.04e+8)
        });
        console.log('loan: ' + loan._id);
    }
};

module.exports = seedDB;