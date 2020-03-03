var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    publisher: {
        type: Schema.Types.ObjectId, ref: 'Publisher',
        required: true
    },
    authors: [{
        type: Schema.Types.ObjectId, ref: 'Author',
        required: true
    }],
    genres: [{
        type: Schema.Types.ObjectId, ref: 'Genre',
        required: true
    }]
});

mongoose.model('Book', bookSchema);