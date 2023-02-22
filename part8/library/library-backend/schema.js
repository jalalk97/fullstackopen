const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): AddBookResponse!
    editAuthor(name: String!, setBornTo: Int!): EditAuthorResponse!
    createUser(username: String!, favouriteGenre: String!): CreateUserResponse
    login(username: String!, password: String!): LoginResponse
  }

  type AddBookResponse {
    code: Int!
    success: Boolean!
    message: String!
    book: Book
  }

  type EditAuthorResponse {
    code: Int!
    success: Boolean!
    message: String!
    author: Author
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type LoginResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: Token
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    id: ID!
    username: String!
    favouriteGenre: String!
  }

  type Token {
    value: String!
  }
`;

module.exports = typeDefs;
