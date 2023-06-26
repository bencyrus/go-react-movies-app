import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MoviesPage = () => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		const headers = new Headers()
		headers.append('Content-Type', 'application/json')

		const options = {
			method: 'GET',
			headers: headers,
		}

		fetch(`/movies`, options)
			.then((response) => response.json())
			.then((data) => {
				setMovies(data)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [])

	return (
		<div>
			<h2>Movies</h2>
			<hr />
			<table className='table table-striped table-hover'>
				<thead>
					<tr>
						<th>Movie</th>
						<th>Release Date</th>
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie.id}>
							<td>
								<Link to={`/movies/${movie.id}`}>
									{movie.title}
								</Link>
							</td>
							<td>{movie.releaseDate}</td>
							<td>{movie.mpaaRating}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default MoviesPage
