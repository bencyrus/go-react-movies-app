import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MoviesPage = () => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		let moviesList = [
			{
				id: 1,
				title: 'The Shawshank Redemption',
				release_date: '1994-09-14',
				runtime: 144,
				mpaa_rating: 'R',
				description:
					'Shawshank Redemption is a prison drama based on a Stephen King story, starring Tim Robbins and Morgan Freeman.',
			},
			{
				id: 2,
				title: 'The Godfather',
				release_date: '1972-03-24',
				runtime: 175,
				mpaa_rating: 'R',
				description:
					'The Godfather is a mob drama, starring Marlon Brando, Al Pacino, James Caan, Robert Duvall and Diane Keaton.',
			},
			{
				id: 3,
				title: 'The Godfather: Part II',
				release_date: '1974-12-18',
				runtime: 202,
				mpaa_rating: 'R',
				description:
					'The Godfather: Part II is a mob drama, starring Al Pacino, Robert Duvall, Diane Keaton, Robert De Niro and John Cazale.',
			},
			{
				id: 4,
				title: 'The Dark Knight',
				release_date: '2008-07-18',
				runtime: 152,
				mpaa_rating: 'PG-13',
				description:
					'The Dark Knight is a superhero movie based on a DC Comics character Batman, starring Christian Bale, Heath Ledger, Michael Caine, Gary Oldman, Aaron Eckhart, Maggie Gyllenhaal and Morgan Freeman.',
			},
			{
				id: 5,
				title: '12 Angry Men',
				release_date: '1957-04-10',
				runtime: 96,
				mpaa_rating: 'Not Rated',
				description:
					'12 Angry Men is a courtroom drama, starring Henry Fonda, Lee J. Cobb, Ed Begley, E.G. Marshall, Jack Warden, Martin Balsam, John Fiedler, Jack Klugman, Edward Binns, Joseph Sweeney, George Voskovec and Robert Webber.',
			},
		]
		setMovies(moviesList)
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
							<td>{movie.release_date}</td>
							<td>{movie.mpaa_rating}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default MoviesPage
