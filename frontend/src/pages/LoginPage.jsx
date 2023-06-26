import { useState } from 'react'
import Input from '../components/forms/Input'
import { useNavigate, useOutletContext } from 'react-router-dom'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh } =
		useOutletContext()

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		let payload = {
			email: email,
			password: password,
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(payload),
		}

		fetch('/authenticate', options)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					setAlertClassName('alert alert-danger')
					setAlertMessage(data.message)
					console.log('error')
				} else {
					setJwtToken(data.access_token)
					setAlertClassName('d-none')
					setAlertMessage('')
					toggleRefresh(true)
					navigate('/')
				}
			})
			.catch((error) => {
				setAlertClassName('alert alert-danger')
				setAlertMessage(error.message)
			})
	}

	return (
		<div className='col-md-6 offset-md-3'>
			<h2>Login</h2>
			<hr />
			<form onSubmit={handleSubmit}>
				<Input
					label='Email Address'
					type='email'
					className='form-control'
					name='email'
					autoComplete='email-new'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					label='Password'
					type='password'
					className='form-control'
					name='password'
					autoComplete='password-new'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<hr />
				<button type='submit' className='btn btn-primary' value='login'>
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginPage
