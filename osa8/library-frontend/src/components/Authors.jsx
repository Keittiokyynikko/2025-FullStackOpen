import { useState } from "react"
import { EDIT_AUTHOR, GET_AUTHORS } from "./queries"
import { useMutation } from '@apollo/client'

const Authors = ({show, authors, token}) => {
  
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: GET_AUTHORS}],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({variables: {name, setBornTo}})
    setName('')
    setSetBornTo('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && 
      <div>
        <form onSubmit={submit}>
          <h3>set birthyear</h3>
          <div>
          name
          <select value={name} onChange={({target}) => setName(target.value)}>
          {authors.map((a) => {
            return <option key={a.name} value={a.name}>{a.name}</option>
          })}
          </select>
        </div>
        <div>
          birthyear
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">set birthyear</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Authors
