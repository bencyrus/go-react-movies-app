import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/forms/Input'

const GraphQLPage = () => {
	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [fullList, setFullList] = useState([])

	const performSearch = () => {
		const payload = `
		{
			search(titleContains: "${searchTerm}") {
				id
				title
				runtime
				release_date
				mpaa_rating
			}
		}`

		const headers = new Headers()
		headers.append('Content-Type', 'application/graphql')

		const options = {
			method: 'POST',
			headers: headers,
			body: payload,
		}

		fetch('graph', options)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.message)
				} else {
					let theList = Object.values(data.data.search)
					setMovies(theList)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleChange = (e) => {
		e.preventDefault()
		setSearchTerm(e.target.value)

		if (e.target.value.length > 2) {
			performSearch()
		} else {
			setMovies(fullList)
		}
	}

	useEffect(() => {
		const payload = `
		{
			list {
				id
				title
				release_date
				mpaa_rating
			}
		}
		`
		const headers = new Headers()
		headers.append('Content-Type', 'application/graphql')

		const options = {
			method: 'POST',
			headers: headers,
			body: payload,
		}

		fetch('/graph', options)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.message)
				} else {
					let theList = Object.values(data.data.list)
					setMovies(theList)
					setFullList(theList)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<div>
			<h2>GrapthQL</h2>
			<hr />

			<form onSubmit={handleChange}>
				<Input
					label='Search'
					type='search'
					name='search'
					value={searchTerm}
					className='form-control'
					onChange={handleChange}
				/>
			</form>

			{movies ? (
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
								<td>
									{new Date(
										movie.release_date
									).toLocaleDateString()}
								</td>
								<td>{movie.mpaa_rating}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No movies found</p>
			)}
		</div>
	)
}

export default GraphQLPage
