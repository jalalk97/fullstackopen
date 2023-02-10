const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();

const LIBRARY_APP_DB_URI = process.env.LIBRARY_APP_DB_URI;

mongoose
  .connect(LIBRARY_APP_DB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.aggregate()
        .lookup({
          from: Author.collection.name,
          localField: "author",
          foreignField: "_id",
          as: "author",
        })
        .unwind("author")
        .match({
          $and: [
            { "author.name": args.author ?? { $regex: /(?:)/ } },
            { genres: args.genre ?? { $regex: /(?:)/ } },
          ],
        });
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        const book = new Book({ ...args, author });
        return book.save();
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    editAuthor: async (root, args) => {
      console.log("args:", args);
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, context: "query", runValidators: true }
      );
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.aggregate()
        .lookup({
          from: Author.collection.name,
          localField: "author",
          foreignField: "_id",
          as: "author",
        })
        .unwind("author")
        .match({ "author.name": root.name })
        .count("count")
        .then((result) => result[0].count);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
