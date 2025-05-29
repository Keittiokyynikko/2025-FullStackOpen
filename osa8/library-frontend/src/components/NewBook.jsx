import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, GET_BOOKS, GET_AUTHORS } from './queries'
import Notify from ".//Notify";
import { updateCache } from '../App';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [notification, setNotification] = useState(null);
  const [noteColor, setNoteColor] = useState(null);

  const [createBook] = useMutation(CREATE_BOOK, {
    fetchPolicy: "network-only",
    refetchQueries: {query: GET_BOOKS},
    update: () => {
      setNotification('Book added!')
      setNoteColor('green')
      setTimeout(() => {
        setNotification(null)
        setNoteColor(null)
      }, 2000)
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(error)
      setNotification(messages)
      setNoteColor('red')
        setTimeout(() => {
          setNotification(null)
          setNoteColor(null)
        }, 2000)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({variables: {title, author, published, genres}})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={notification} color={noteColor}/>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook