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

func (m *PostgresDBRepo) OneMovie(id int) (*models.Movie, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		SELECT
			id, title, release_date, runtime, mpaa_rating, description, coalesce(image, ''), created_at, updated_at
		FROM
			movies
		WHERE
			id = $1
	`

	row := m.DB.QueryRowContext(context, query, id)

	var movie models.Movie

	err := row.Scan(
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

	query = `
		SELECT
			g.id, g.genre
		FROM
			movies_genres mg
		LEFT JOIN genres g ON (g.id = mg.genre_id)
		WHERE
			mg.movie_id = $1
	`

	rows, err := m.DB.QueryContext(context, query, id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var genre models.Genre
		err := rows.Scan(
			&genre.ID,
			&genre.Genre,
		)

		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}

	movie.Genres = genres

	return &movie, nil
}

func (m *PostgresDBRepo) OneMovieForEdit(id int) (*models.Movie, []*models.Genre, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		SELECT
			id, title, release_date, runtime, mpaa_rating, description, coalesce(image, ''), created_at, updated_at
		FROM
			movies
		WHERE
			id = $1
	`

	row := m.DB.QueryRowContext(context, query, id)

	var movie models.Movie

	err := row.Scan(
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
		return nil, nil, err
	}

	query = `
		SELECT
			g.id, g.genre
		FROM
			movies_genres mg
		LEFT JOIN genres g ON (g.id = mg.genre_id)
		WHERE
			mg.movie_id = $1
	`

	rows, err := m.DB.QueryContext(context, query, id)

	if err != nil {
		return nil, nil, err
	}

	defer rows.Close()

	var genres []*models.Genre
	var genresArray []int

	for rows.Next() {
		var genre models.Genre
		err := rows.Scan(
			&genre.ID,
			&genre.Genre,
		)

		if err != nil {
			return nil, nil, err
		}

		genres = append(genres, &genre)
		genresArray = append(genresArray, genre.ID)
	}

	movie.Genres = genres
	movie.GenresArray = genresArray

	var allGenres []*models.Genre

	query = `
		SELECT
			id, genre
		FROM
			genres
		ORDER BY
			genre
	`

	gRows, err := m.DB.QueryContext(context, query)

	if err != nil {
		return nil, nil, err
	}

	defer gRows.Close()

	for gRows.Next() {
		var genre models.Genre
		err := gRows.Scan(
			&genre.ID,
			&genre.Genre,
		)

		if err != nil {
			return nil, nil, err
		}

		allGenres = append(allGenres, &genre)
	}

	return &movie, allGenres, nil
}

func (m *PostgresDBRepo) AllGenres() ([]*models.Genre, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		SELECT
			id, genre, created_at, updated_at
		FROM
			genres
		ORDER BY
			genre
	`

	rows, err := m.DB.QueryContext(context, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var genres []*models.Genre

	for rows.Next() {
		var genre models.Genre
		err := rows.Scan(
			&genre.ID,
			&genre.Genre,
			&genre.CreatedAt,
			&genre.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}

	return genres, nil
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

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)

	defer cancel()

	var user models.User

	query := `
		SELECT 
			id, first_name, last_name, email, password, created_at, updated_at
		FROM
			users
		WHERE
			id = $1
	`

	row := m.DB.QueryRowContext(context, query, id)

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

func (m *PostgresDBRepo) InsertMovie(movie models.Movie) (int, error) {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		INSERT INTO movies
			(title, release_date, runtime, mpaa_rating, description, image, created_at, updated_at)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id
	`

	var newID int

	err := m.DB.QueryRowContext(context, query,
		movie.Title,
		movie.ReleaseDate,
		movie.Runtime,
		movie.MPAARating,
		movie.Description,
		movie.ImageURL,
		movie.CreatedAt,
		movie.UpdatedAt,
	).Scan(&newID)

	if err != nil {
		return 0, err
	}

	return newID, nil
}

func (m *PostgresDBRepo) UpdateMovieGenres(id int, genreIDs []int) error {
	context, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		DELETE FROM
			movies_genres
		WHERE
			movie_id = $1
	`

	_, err := m.DB.ExecContext(context, query, id)
	if err != nil {
		return err
	}

	for _, genreID := range genreIDs {
		query := `
			INSERT INTO movies_genres
				(movie_id, genre_id)
			VALUES
				($1, $2)
		`

		_, err = m.DB.ExecContext(context, query, id, genreID)
		if err != nil {
			return err
		}
	}

	return nil
}
