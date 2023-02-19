const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, { author, genre }) => {
      if (author && genre) {
        return books.filter(
          (book) => book.author === author && book.genres.includes(genre)
        );
      }
      if (author) {
        return books.filter((book) => book.author === author);
      }
      if (genre) {
        return books.filter((book) => book.genres.includes(genre));
      }
      return books;
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (_, { title, author, published, genres }) => {
      const book = { title, author, published, genres, id: uuid() };
      books = books.concat(book);

      const response = {
        code: 201,
        success: true,
        message: `Successfully created book with author ${author}`,
        book,
      };

      const existingAuthor = authors.find((a) => a.name === author);

      if (!existingAuthor) {
        const newAuthor = { name: author, id: uuid() };
        authors = authors.concat(newAuthor);
        return {
          ...response,
          author: newAuthor,
        };
      }

      return {
        ...response,
        author: existingAuthor,
      };
    },
    editAuthor: (_, { name, setBornTo }) => {
      const author = authors.find((author) => author.name === name);

      if (!author) {
        return {
          code: 404,
          success: false,
          message: `Author '${name}' not found`,
          author: null,
        };
      }

      const updatedAuthor = { ...author, born: setBornTo };
      authors = authors.map((a) => (a.name === name ? updatedAuthor : a));

      return {
        code: 200,
        success: true,
        message: `Author '${name}' updated`,
        author: updatedAuthor,
      };
    },
  },
};

module.exports = resolvers;
