import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MoviePage = () => {
	const [movie, setMovie] = useState({})
	let { id } = useParams()

	useEffect(() => {
		const headers = new Headers()
		headers.append('Content-Type', 'application/json')

		const options = {
			method: 'GET',
			headers: headers,
		}

		fetch(`http://localhost:7070/movies/${id}`, options)
			.then((response) => response.json())
			.then((data) => {
				setMovie(data)
			})
			.catch((error) => console.log(error))
	}, [id])

	if (movie.genres) {
		movie.genres = Object.values(movie.genres)
	} else {
		movie.genres = []
	}

	return (
		<div>
			<h2>Movie: {movie.title}</h2>
			<small>
				<em>
					{movie.releaseDate}, {movie.runtime} minutes, Rated{' '}
					{movie.mpaaRating}
				</em>
			</small>
			<br />
			{movie.genres.map((g) => (
				<span key={g.genre} className='badge bg-secondary me-2'>
					{g.genre}
				</span>
			))}
			<hr />
			{movie.imageURL && (
				<div className='mb-3'>
					<img
						src={`https://image.tmdb.org/t/p/w200${movie.imageURL}`}
						alt={movie.title}
					/>
				</div>
			)}
			<p>{movie.description}</p>
		</div>
	)
}

export default MoviePage
