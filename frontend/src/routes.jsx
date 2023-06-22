import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import GenresPage from './pages/GenresPage'
import EditMovie from './pages/EditMovie'
import ManageCataloguePage from './pages/ManageCataloguePage'
import GrapthQLPage from './pages/GrapthQLPage'
import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'movies',
				element: <MoviesPage />,
			},
			{
				path: 'genres',
				element: <GenresPage />,
			},
			{
				path: 'graphQL',
				element: <GrapthQLPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
		],
	},
	{
		path: '/admin',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'movie/:id',
				element: <EditMovie />,
			},
			{
				path: 'manage-catalogue',
				element: <ManageCataloguePage />,
			},
		],
	},
])

export default router
