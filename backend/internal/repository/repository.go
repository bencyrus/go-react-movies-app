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
	// GetUserByEmail returns a user by email address
	GetUserByEmail(email string) (*models.User, error)
}
