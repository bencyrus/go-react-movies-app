import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MoviePage = () => {
	const [movie, setMovie] = useState({})
	let { id } = useParams()

	useEffect(() => {
		let myMovie = {
			id: 1,
			title: 'The Shawshank Redemption',
			release_date: '1994-09-14',
			runtime: 144,
			mpaa_rating: 'R',
			description:
				'Shawshank Redemption is a prison drama based on a Stephen King story, starring Tim Robbins and Morgan Freeman.',
		}
		setMovie(myMovie)
	}, [id])

	return (
		<div>
			<h2>Movie: {movie.title}</h2>
			<small>
				<em>
					{movie.release_date}, {movie.runtime} minutes, Rated{' '}
					{movie.mpaa_rating}
				</em>
			</small>
			<hr />
			<p>{movie.description}</p>
		</div>
	)
}

export default MoviePage
