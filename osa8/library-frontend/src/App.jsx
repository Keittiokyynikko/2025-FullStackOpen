import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import Notify from "./components/Notify";
import { GET_AUTHORS, GET_BOOKS, GET_GENRES, LOGIN, ME, BOOK_ADDED } from "./components/queries";
import { useQuery, useApolloClient, useMutation, useSubscription  } from '@apollo/client';
import LoginForm from "./components/LoginForm";

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ( data ) => ({
      allBooks: uniqByName(data.allBooks.concat(addedBook)),
  }))
}

const App = () => {
  const [page, setPage] = useState("authors");
   const [token, setToken] = useState(null);
   const [notification, setNotification] = useState(null);
   const [noteColor, setNoteColor] = useState(null);
   const client = useApolloClient()

  const authors = useQuery(GET_AUTHORS, {fetchPolicy: "network-only"})
  const books = useQuery(GET_BOOKS, {fetchPolicy: "network-only"})
  const genres = useQuery(GET_GENRES)
  const me = useQuery(ME)

  const [ login, result ] = useMutation(LOGIN, {
      onError: (error) => {
       console.log(error.graphQLErrors[0].message)
      }
    })

    useSubscription(BOOK_ADDED, {
      fetchPolicy: "network-only",
      onData: ({ data, client }) => {
        console.log(data.data)
        window.alert("Book added!")
        const addedBook = data.data.bookAdded
        console.log("Before")
        updateCache(client.cache, { query: GET_BOOKS }, addedBook)
        console.log("After", client.cache.data.data)
      }  
    })
  
    useEffect(() => {
      if ( result.data ) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)
        setPage("recommendations")
      }
    }, [result.data])

    useEffect(() => {
      console.log(me)
      const loggedUser = window.localStorage.getItem('library-user-token')
      if(loggedUser) {
        setToken(loggedUser)
      }
    }, [])

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }

  if (books.loading)  {
    return <div>loading...</div>
  }

  if (genres.loading) {
    return <div>loading...</div>
  }

  if(!token) {
    return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} />

      <Books show={page === "books"} books={books.data.allBooks} genres={genres.data.allGenres} />

      <LoginForm show={page === "login"} login={login} setPage={setPage} />

    </div>
    )
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommendations")}>recommendations</button>
          <button onClick={logout}>logout</button>
        </div>
  
        <Authors show={page === "authors"} authors={authors.data.allAuthors} token={token} />
  
        <Books show={page === "books"} books={books.data.allBooks} genres={genres.data.allGenres} />

        <Recommendations show={page === "recommendations"} />
  
        <NewBook show={page === "add"} />
  
      </div>
    );
  }
};

export default App;
