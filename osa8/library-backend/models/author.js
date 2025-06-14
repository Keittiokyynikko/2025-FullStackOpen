const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  book: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }]
})

schema.virtual('bookCount', {
    ref: 'Book',
    localField: 'book',
    foreignField: '_id',
    justOne: false,
    count: true,
});

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)