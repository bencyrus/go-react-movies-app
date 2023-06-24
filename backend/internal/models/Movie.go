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
	Genres      []*Genre  `json:"genres,omitempty"`
	GenresArray []int     `json:"-"`
}

type Genre struct {
	ID        int       `json:"id"`
	Genre     string    `json:"genre"`
	Checked   bool      `json:"checked"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
