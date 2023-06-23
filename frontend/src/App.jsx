import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './components/Alert'

function App() {
	const [jwtToken, setJwtToken] = useState('')
	const [alertMessage, setAlertMessage] = useState('')
	const [alertClassName, setAlertClassName] = useState('d-none')

	const navigate = useNavigate()

	const logOut = () => {
		setJwtToken('')
		navigate('/login')
	}

	useEffect(() => {
		if (jwtToken === '') {
			const options = {
				method: 'GET',
				credentials: 'include',
			}

			fetch('http://localhost:7070/refresh', options)
				.then((response) => response.json())
				.then((data) => {
					if (data.access_token) {
						setJwtToken(data.access_token)
					}
				})
				.catch((error) => console.error('User is not logged in', error))
		}
	}, [jwtToken])

	return (
		<div className='App container'>
			<div className='row'>
				<div className='col'>
					<h1 className='mt-3'>Go watch a video!</h1>
				</div>
				<div className='col text-end'>
					{jwtToken === '' ? (
						<Link to='/login'>
							<span className='badge bg-success'>Login</span>
						</Link>
					) : (
						<Link to='#' onClick={logOut}>
							<span className='badge bg-danger' onClick={logOut}>
								Logout
							</span>
						</Link>
					)}
				</div>
				<hr className='mb-3' />
			</div>
			<div className='row'>
				<div className='col-md-3'>
					<nav className='list-group'>
						<Link
							className='list-group-item list-group-item-action'
							to='/'>
							Home
						</Link>
						<Link
							className='list-group-item list-group-item-action'
							to='/movies'>
							Movies
						</Link>
						<Link
							className='list-group-item list-group-item-action'
							to='/genres'>
							Genres
						</Link>
						{jwtToken !== '' && (
							<>
								<Link
									className='list-group-item list-group-item-action'
									to='/add-movie'>
									Add Movie
								</Link>
								<Link
									className='list-group-item list-group-item-action'
									to='/manage-catalogue'>
									Manage Catalogue
								</Link>
								<Link
									className='list-group-item list-group-item-action'
									to='/graphQL'>
									GraphQL
								</Link>
							</>
						)}
					</nav>
				</div>
				<div className='col-md-9'>
					<Alert className={alertClassName}>{alertMessage}</Alert>
					<Outlet
						context={{
							jwtToken,
							setJwtToken,
							setAlertMessage,
							setAlertClassName,
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
