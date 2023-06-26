import { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

const ManageCataloguePage = () => {
	const [movies, setMovies] = useState([])
	const { jwtToken } = useOutletContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (jwtToken === '') {
			navigate('/login')
		}

		const headers = new Headers()
		headers.append('Content-Type', 'application/json')
		headers.append('Authorization', `Bearer ${jwtToken}`)

		const options = {
			method: 'GET',
			headers: headers,
		}

		fetch(`/admin/movies`, options)
			.then((response) => response.json())
			.then((data) => {
				setMovies(data)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [jwtToken, navigate])

	return (
		<div>
			<h2>Manage Catalogue</h2>
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
								<Link to={`/admin/movies/${movie.id}`}>
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

export default ManageCataloguePage
