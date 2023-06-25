package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	// DBConnection returns a database connection
	Connection() *sql.DB
	// AllMovies returns all movies
	AllMovies() ([]*models.Movie, error)
	// OneMovie returns one movie by id
	OneMovie(id int) (*models.Movie, error)
	// OneMovieForEdit returns one movie for editing by id
	OneMovieForEdit(id int) (*models.Movie, []*models.Genre, error)
	// AllGenres returns all genres
	AllGenres() ([]*models.Genre, error)
	// InsertMovie inserts a movie
	InsertMovie(movie models.Movie) (int, error)
	// UpdateMovieGenres updates movie genres
	UpdateMovieGenres(id int, genreIDs []int) error
	// GetUserByEmail returns a user by email address
	GetUserByEmail(email string) (*models.User, error)
	// GetUserByID returns a user by id
	GetUserByID(id int) (*models.User, error)
}
