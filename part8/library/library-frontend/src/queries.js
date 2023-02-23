import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
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

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
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

export const SET_AUTHOR_BIRTH_YEAR = gql`
  mutation setAuthorBirthYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
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
