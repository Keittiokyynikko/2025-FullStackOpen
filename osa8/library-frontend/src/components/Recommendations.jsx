import { ME, GET_BOOKS } from "./queries";
import { useQuery } from '@apollo/client';

const Recommendations = ({show}) => {

    const {data} = useQuery(GET_BOOKS)
    const {me, loading} = useQuery(ME)

    if(!show) {
        return null
    }

    if(!data) {
        <h1>Books loading</h1>
    }

    if(loading) {
        <h1>User loading</h1>
    }

    const filterBooks = data.allBooks.filter(b => b.genres.includes(me.favoriteGenre))

    return (
        <>
        <h1>recommendations</h1>
        <p>books in your favourite genre {me ? me.favoriteGenre : "nothing"}</p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </>
    )
}

export default Recommendations