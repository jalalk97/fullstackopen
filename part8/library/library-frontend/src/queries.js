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
  query GetAllBooks {
    allBooks {
      id
      title
      published
      author
      genres
    }
  }
`;
