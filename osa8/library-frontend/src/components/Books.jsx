import { useState, useEffect } from "react";
import "./Books.css"

const Books = ({books, show, genres}) => {

  const [selGenre, setSelGenre] = useState(undefined);
  const [filterBooks, setFilterBooks] = useState(undefined)
  
  if (!show) {
    return null
  }

  const handleClick = (event, value) => {
    event.preventDefault()
    if(value !== selGenre) {
      setSelGenre(value)
      books = books.filter(b => b.genres.includes(value))
      setFilterBooks(books)
    } else {
      setSelGenre("")
      setFilterBooks(null)
      books = books
      
    };
    
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{selGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks ? filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )) : books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => {
            return <button className={selGenre === g ? "active" : "no-active"} onClick={(event) => handleClick(event, g)} key={g}>{g}</button>
          })}
    </div>
  )
}

export default Books
