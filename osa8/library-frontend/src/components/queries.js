import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql `
    fragment BookDetails on Book {
        id
        title
        genres
        published
        author {
            name
        }
    }
`

export const GET_AUTHORS = gql `
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const GET_BOOKS = gql `
    query ($genre: String){
            allBooks(genre: $genre) {
                id
                title
                genres
                published
                author {
                    name
                }
            }
        }
`

export const BOOKS_BY_GENRE = gql `
    query BooksByGenre($genre: String) {
            booksByGenre(genre: $genre) {
                title
                genres
                published
                author {
                    name
                }
            }
        }
`

export const GET_GENRES = gql `
    query {
            allGenres
    }
`

export const ME = gql `
    query {
            me {
                username
                favoriteGenre
            }
    }
`

export const CREATE_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
        name
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`