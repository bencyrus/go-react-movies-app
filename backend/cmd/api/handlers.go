package main

import (
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Home handler handles the home page
func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Go Movies Up and Running",
		Version: "1.0.0",
	}

	out, err := json.MarshalIndent(payload, "", "\t")
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

// AllMovies handler handles the all movies page
func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	rd, _ := time.Parse("2006-01-02", "1994-09-14")

	shawshank := models.Movie{
		ID:          1,
		Title:       "The Shawshank Redemption",
		ReleaseDate: rd,
		Runtime:     144,
		MPAARating:  "R",
		Description: "Shawshank Redemption is a prison drama based on a Stephen King story, starring Tim Robbins and Morgan Freeman.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, shawshank)

	rd, _ = time.Parse("2006-01-02", "1972-03-24")
	godfather := models.Movie{
		ID:          2,
		Title:       "The Godfather",
		ReleaseDate: rd,
		Runtime:     175,
		MPAARating:  "R",
		Description: "The Godfather is a mob drama, starring Marlon Brando, Al Pacino, James Caan, Robert Duvall and Diane Keaton.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, godfather)

	rd, _ = time.Parse("2006-01-02", "1974-12-18")
	godfather2 := models.Movie{
		ID:          3,
		Title:       "The Godfather: Part II",
		ReleaseDate: rd,
		Runtime:     202,
		MPAARating:  "R",
		Description: "The Godfather: Part II is a mob drama, starring Al Pacino, Robert Duvall, Diane Keaton, Robert De Niro and John Cazale.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, godfather2)

	rd, _ = time.Parse("2006-01-02", "2008-07-18")
	darkKnight := models.Movie{
		ID:          4,
		Title:       "The Dark Knight",
		ReleaseDate: rd,
		Runtime:     152,
		MPAARating:  "PG-13",
		Description: "The Dark Knight is a superhero movie based on a DC Comics character Batman, starring Christian Bale, Heath Ledger, Michael Caine, Gary Oldman, Aaron Eckhart, Maggie Gyllenhaal and Morgan Freeman.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	movies = append(movies, darkKnight)

	out, err := json.MarshalIndent(movies, "", "\t")
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}
