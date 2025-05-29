const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const crypto = require("crypto")
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => {
      Book.collection.countDocuments()
    },
    authorCount: async () => {
      Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', {name:1, born:1})
      if(args.author && args.genres) {
        return books.filter(b => b.author.name === args.author && b.genres.includes(args.genre))
      } else if(args.author) {
        return books.filter(b => b.author.name === args.author)
      } else if(args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      } else {
        return books
      }
    },
    allAuthors: async () => await Author.find({}).populate({path:'bookCount'}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})
      let genreArray = []
      books.forEach(element => {
        if(element.genres !== undefined) {
          element.genres.forEach(el => {
            if(!genreArray.includes(el)) {
              genreArray.push(el)
            }
          })
        }
      });
      return genreArray
    },
    booksByGenre: async (root, args) => {
      const books = await Book.find({})
      return books.filter(b => b.genres.includes(args.genre))
    }
  },
  Author: {
    bookCount: async (root) => {
      console.log("bookCount")
      const books = await Book.find({author: root})
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser
      if(!user) {
        throw new Error("User not logged in")
      }
      let author = await Author.findOne({name: args.author})
      let book
      if(!author) {
        const newAuthor = new Author({name: args.author, id: crypto.randomBytes(12).toString("hex")})
        try {
          await newAuthor.save()
        } catch (error) {
            console.log("Author wrong", error)
          throw new Error(error.message, {
            invalidArgs: args,
          })
        }
        book = new Book({title: args.title, published: args.published, genres: args.genres, author: newAuthor })
      } else {
        book = new Book({title: args.title, published: args.published, genres: args.genres, author: author })
      }
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser
      if(!user) {
        throw new Error("User not logged in")
      }
      const updated = {...args, born: args.setBornTo}
      let author = await Author.findOneAndUpdate({name: args.name}, updated, {new: true})
      if(!author) {
        return null
      } else {
        return author
      }
    },
    createUser: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if(!user) {
        const newUser = new User({...args, password: "salasana", id: uuid()})
        try {
          await newUser.save()
        } catch (error) {
          throw new GraphQLError('user already exists', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return newUser
      } else {
        return null
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'salasana' ) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers