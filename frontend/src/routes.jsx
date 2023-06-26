import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MoviePage from './pages/MoviePage'
import GenresPage from './pages/GenresPage'
import EditMovie from './pages/EditMovie'
import ManageCataloguePage from './pages/ManageCataloguePage'
import GraphQLPage from './pages/GraphQLPage'
import LoginPage from './pages/LoginPage'
import OneGenre from './pages/OneGenre'

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
				path: 'movies/:id',
				element: <MoviePage />,
			},
			{
				path: 'genres',
				element: <GenresPage />,
			},
			{
				path: 'genre/:id',
				element: <OneGenre />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'graphQL',
				element: <GraphQLPage />,
			},
		],
	},
	{
		path: '/admin',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'movies/0',
				element: <EditMovie />,
			},
			{
				path: 'movies/:id',
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
