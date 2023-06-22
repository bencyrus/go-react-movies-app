import { useState } from 'react'
import Input from '../components/forms/Input'
import { useNavigate, useOutletContext } from 'react-router-dom'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { setJwtToken, setAlertClassName, setAlertMessage } =
		useOutletContext()

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		console.log('email/password', email, password)

		if (email === 'admin@example.com' && password === 'password') {
			setJwtToken('abc')
			setAlertClassName('d-none')
			setAlertMessage('')
			navigate('/')
		} else {
			setAlertClassName('alert-danger')
			setAlertMessage('Invalid Credentials')
		}
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
