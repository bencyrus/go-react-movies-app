package dbrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
	"time"
)

type PostgresDBRepo struct {
	DB *sql.DB
}

const dbTimeout = time.Second * 3

// Connection returns a database connection
func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

// AllMovies returns all movies
func (m *PostgresDBRepo) AllMovies() ([]*models.Movie, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)

	defer cancel()

	query := `
		SELECT 
			id, title, release_date, runtime, mpaa_rating, description, coalesce(image, ''), created_at, updated_at
		FROM
			movies
		ORDER BY
			title
		`

	rows, err := m.DB.QueryContext(context, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var movies []*models.Movie

	for rows.Next() {
		var movie models.Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.Runtime,
			&movie.MPAARating,
			&movie.Description,
			&movie.ImageURL,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		movies = append(movies, &movie)
	}

	return movies, nil
}

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.User, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)

	defer cancel()

	var user models.User

	query := `
		SELECT 
			id, first_name, last_name, email, password, created_at, updated_at
		FROM
			users
		WHERE
			email = $1
	`

	row := m.DB.QueryRowContext(context, query, email)

	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}