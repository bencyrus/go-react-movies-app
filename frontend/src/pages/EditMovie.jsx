import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import TextArea from '../components/forms/TextArea'
import CheckBox from '../components/forms/CheckBox'

const EditMovie = () => {
	const navigate = useNavigate()
	const { jwtToken } = useOutletContext()

	const [error, setError] = useState(null)
	const [errors, setErrors] = useState([])

	const [mpaaOptions, setMpaaOptions] = useState([
		{ id: 'G', value: 'G' },
		{ id: 'PG', value: 'PG' },
		{ id: 'PG13', value: 'PG13' },
		{ id: 'R', value: 'R' },
		{ id: 'NC17', value: 'NC17' },
		{ id: '18A', value: '18A' },
	])

	const hasError = (key) => {
		return errors.indexOf(key) !== -1
	}

	const [movie, setMovie] = useState({
		id: 0,
		title: '',
		releaseDate: '',
		MPAARating: '',
		runtime: '',
		description: '',
		genres: [],
		genresArray: [Array(13).fill(false)],
	})

	let { id } = useParams()
	if (id === undefined) {
		id = 0
	}

	useEffect(() => {
		if (jwtToken === null) {
			navigate('/login')
			return
		}

		if (id === 0) {
			setMovie({
				id: 0,
				title: '',
				releaseDate: '',
				MPAARating: '',
				runtime: '',
				description: '',
				genres: [],
				genresArray: [Array(13).fill(false)],
			})

			const headers = new Headers()
			headers.append('Content-Type', 'application/json')

			const options = {
				method: 'GET',
				headers: headers,
			}

			fetch(`http://localhost:7070/genres`, options)
				.then((response) => response.json())
				.then((data) => {
					const checks = []
					data.forEach((g) => {
						checks.push({
							id: g.id,
							checked: false,
							genre: g.genre,
						})
					})

					setMovie((m) => ({
						...m,
						genres: checks,
						genresArray: [],
					}))
				})
				.catch((error) => console.log(error))
		} else {
			return
		}
	}, [jwtToken, navigate])

	const handleSubmit = (e) => {
		e.preventDefault()

		let errors = []
		let requiredFields = [
			{
				field: movie.title,
				name: 'title',
			},
			{
				field: movie.releaseDate,
				name: 'releaseDate',
			},
			{
				field: movie.MPAARating,
				name: 'MPAARating',
			},
			{
				field: movie.runtime,
				name: 'runtime',
			},
			{
				field: movie.description,
				name: 'description',
			},
		]

		requiredFields.forEach((obj) => {
			if (obj.field === '') {
				errors.push(obj.name)
			}
		})

		if (movie.genresArray.length === 0) {
			alert('Please select at least one genre')
			errors.push('genres')
		}

		setErrors(errors)

		if (errors.length > 0) {
			return false
		}
	}

	const handleChange = () => (e) => {
		let value = e.target.value
		let name = e.target.name
		setMovie({ ...movie, [name]: value })
	}

	const handleCheck = (e, position) => {
		let tmpArray = movie.genres
		tmpArray[position].checked = !tmpArray[position].checked

		let tmpIDs = movie.genresArray
		if (!e.target.checked) {
			tmpIDs.splice(position, 1)
		} else {
			tmpIDs.push(parseInt(e.target.value, 10))
		}

		setMovie({
			...movie,
			genresArray: tmpIDs,
		})
	}

	return (
		<div>
			<h2>Add/Edit Movie</h2>
			<hr />
			{/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}
			<form onSubmit={handleSubmit}>
				<input type='hidden' id='id' name='id' value={movie.id} />

				<Input
					className='form-control'
					label={'Title'}
					name={'title'}
					type={'text'}
					value={movie.title}
					onChange={handleChange('title')}
					placeholder={'Enter movie title'}
					errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
					errorMessage={'Please enter a title'}
				/>
				<Input
					className='form-control'
					label={'Release Date'}
					name={'releaseDate'}
					type={'date'}
					value={movie.releaseDate}
					onChange={handleChange('releaseDate')}
					placeholder={'Enter movie release date'}
					errorDiv={
						hasError('releaseDate') ? 'text-danger' : 'd-none'
					}
					errorMessage={'Please enter a release date'}
				/>
				<Input
					className='form-control'
					label={'Runtime'}
					name={'runtime'}
					type={'text'}
					value={movie.runtime}
					onChange={handleChange('runtime')}
					placeholder={'Enter movie runtime'}
					errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
					errorMessage={'Please enter a runtime'}
				/>
				<Select
					className='form-control'
					label={'MPAA Rating'}
					name={'MPAARating'}
					value={movie.MPAARating}
					onChange={handleChange('MPAARating')}
					placeholder={'Select MPAA Rating'}
					errorDiv={hasError('MPAARating') ? 'text-danger' : 'd-none'}
					errorMessage={'Please select an MPAA Rating'}
					options={mpaaOptions}
				/>
				<TextArea
					className='form-control'
					label={'Description'}
					name={'description'}
					value={movie.description}
					rows={3}
					onChange={handleChange('description')}
					placeholder={'Enter movie description'}
					errorDiv={
						hasError('description') ? 'text-danger' : 'd-none'
					}
					errorMessage={'Please enter a description'}
				/>

				<hr />

				<h3>Genres</h3>

				{movie.genres && movie.genres.length > 0 && (
					<>
						{Array.from(movie.genres).map((g, idx) => (
							<CheckBox
								key={idx}
								className='form-check-input'
								label={g.genre}
								name={g.genre}
								checked={movie.genres[idx].checked}
								onChange={(e) => handleCheck(e, idx)}
								value={g.id}
								errorDiv={
									hasError('genres')
										? 'text-danger'
										: 'd-none'
								}
								errorMessage={
									'Please select at least one genre'
								}
							/>
						))}
					</>
				)}

				<hr />

				<button type='submit' className='btn btn-primary'>
					Save
				</button>
			</form>
		</div>
	)
}

export default EditMovie
