const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.collection.countDocuments();
    },
    authorCount: async () => {
      return Author.collection.countDocuments();
    },
    allBooks: async (_, { author, genre }) => {
      if (author) {
        let query;
        const authorDoc = await Author.findOne({ name: author });
        query = Book.where("author").equals(authorDoc.id);
        if (genre) {
          return query.where({ genres: genre }).exec();
        }
        return query.exec();
      }
      if (genre) {
        return Book.where({ genres: genre }).exec();
      }
      return Book.find({});
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (_, __, { currentUser }) => {
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (
      _,
      { title, author, published, genres },
      { currentUser }
    ) => {
      if (!currentUser) {
        return {
          code: 401,
          success: false,
          message: `Unauthenticated`,
          book: null,
        };
      }

      const bookWithoutAuthor = {
        title,
        published,
        genres,
      };
      let book;

      const existingAuthor = await Author.findOne({ name: author });

      try {
        if (!existingAuthor) {
          const newAuthor = await new Author({ name: author }).save();
          book = await new Book({
            ...bookWithoutAuthor,
            author: newAuthor._id,
          }).save();
        } else {
          book = await new Book({
            ...bookWithoutAuthor,
            author: existingAuthor._id,
          }).save();
        }

        return {
          code: 201,
          success: true,
          message: `Successfully created book '${title}' by '${author}'`,
          book,
        };
      } catch (error) {
        // const { errors, _message } = error;
        // throw new GraphQLError(`${_message}: ${errors.title ?? errors.name}`, {
        //   extensions: {
        //     code: "BAD_USER_INPUT",
        //     invalidArgs: errors.title ? title : author,
        //     error
        //   },
        // });
        return {
          code: 400,
          success: false,
          message: `${error._message}: ${
            error.errors.title ?? error.errors.name
          }`,
          book: null,
        };
      }
    },
    editAuthor: async (_, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        return {
          code: 401,
          success: false,
          message: `Unauthenticated`,
          author: null,
        };
      }

      const author = await Author.findOne({ name });

      if (!author) {
        // throw new GraphQLError(`Author '${name}' not found`, {
        //   extensions: {
        //     code: "BAD_USER_INPUT",
        //     invalidArgs: name,
        //   }
        // })
        return {
          code: 400,
          success: false,
          message: `Author '${name}' not found`,
          author: null,
        };
      }

      author.born = setBornTo;
      await author.save();

      return {
        code: 200,
        success: true,
        message: `Author '${name}' updated`,
        author,
      };
    },
    createUser: async (_, { username, favouriteGenre }) => {
      try {
        const user = await new User({ username, favouriteGenre }).save();
        return {
          code: 201,
          success: true,
          message: "Successfully created new user",
          user,
        };
      } catch (error) {
        return {
          code: 400,
          success: false,
          message: `${error._message}: ${error.errors.username}`,
          user: null,
        };
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        return {
          code: 400,
          success: false,
          message: "Wrong credentials",
          token: null,
        };
      }

      const userForToken = {
        username,
        id: user._id,
      };

      return {
        code: 200,
        success: true,
        message: "Successfully logged in",
        token: {
          value: jwt.sign(userForToken, process.env.JWT_SECRET),
        },
      };
    },
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name });
      return Book.collection.countDocuments({ author: author._id });
    },
  },
  Book: {
    author: async ({ id }) => {
      const book = await Book.findById(id);
      return Author.findById(book.author);
    },
  },
};

module.exports = resolvers;
