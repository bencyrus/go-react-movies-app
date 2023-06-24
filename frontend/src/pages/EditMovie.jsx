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
	})

	let { id } = useParams()
	useEffect(() => {
		if (jwtToken === null) {
			navigate('/login')
			return
		}
	}, [jwtToken, navigate])

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	const handleChange = () => (e) => {
		let value = e.target.value
		let name = e.target.name
		setMovie({ ...movie, [name]: value })
	}

	return (
		<div>
			<h2>Add/Edit Movie</h2>
			<hr />
			<pre>{JSON.stringify(movie, null, 3)}</pre>
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
			</form>
		</div>
	)
}

export default EditMovie
