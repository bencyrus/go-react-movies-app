package models

import "time"

type Movie struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	ReleaseDate time.Time `json:"releaseDate"`
	Runtime     int       `json:"runtime"`
	MPAARating  string    `json:"mpaaRating"`
	Description string    `json:"description"`
	ImageURL    string    `json:"imageURL"`
	CreatedAt   time.Time `json:"-"`
	UpdatedAt   time.Time `json:"-"`
}
