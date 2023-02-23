import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id
      title
      published
      author {
        id
        born
        bookCount
        name
      }
      genres
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription Subscription {
    bookAdded {
      id
      title
      published
      author {
        id
        name
        born
        bookCount
      }
      genres
    }
  }
`;
