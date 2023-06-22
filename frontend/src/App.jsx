import { Link, Outlet } from 'react-router-dom'

function App() {
	return (
		<div className='App container'>
			<div className='row'>
				<div className='col'>
					<h1 className='mt-3'>Go watch a video!</h1>
				</div>
				<div className='col text-end'>
					<Link to='/login'>
						<span className='badge bg-success'>Login</span>
					</Link>
				</div>
				<hr className='mb-3' />
			</div>
			<div className='row'>
				<div className='col-md-2'>
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
					</nav>
				</div>
				<div className='col-md-10'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default App
