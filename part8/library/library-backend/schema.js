const gql = require("graphql-tag");

const typeDefs = gql`
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
    ): AddBookResponse!

    editAuthor(name: String!, setBornTo: Int!): EditAuthorResponse!
  }

  type AddBookResponse {
    code: Int!
    success: Boolean!
    message: String!
    book: Book
    author: Author
  }

  type EditAuthorResponse {
    code: Int!
    success: Boolean!
    message: String!
    author: Author
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
`;

module.exports = typeDefs;
