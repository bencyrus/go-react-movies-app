import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const GenresPage = () => {
	const [genres, setGenres] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const headers = new Headers()
		headers.append('Content-Type', 'application/json')

		const options = {
			method: 'GET',
			headers: headers,
		}

		fetch('/genres', options)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setError(data.message)
				} else {
					setGenres(data)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [genres, error])

	if (error !== null) {
		return <div>Error: {error}</div>
	} else {
		return (
			<div>
				<h2>Genres</h2>
				<hr />
				<div className='list-group'>
					{genres.map((genre) => (
						<Link
							key={genre.id}
							to={`/genre/${genre.id}`}
							state={{ genreName: genre.genre }}
							className='list-group-item list-group-item-action'>
							{genre.genre}
						</Link>
					))}
				</div>
			</div>
		)
	}
}

export default GenresPage
