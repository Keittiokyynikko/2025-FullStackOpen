import { useQuery, useApolloClient } from '@apollo/client'
import Persons from './Persons'
import { ALL_PERSONS } from './queries'
import PersonForm from './PersonForm'
import LoginForm from './LoginForm'
import { useState } from 'react'

const App = () => {

  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_PERSONS)
  if (result.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  if (!token) {
    return (
      <>
        
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  if (!token) {
    return (
      <div>

        <button onClick={logout}>logout</button>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
    </div>
  )
}

export default App