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
}
