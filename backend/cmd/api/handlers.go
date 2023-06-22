package main

import (
	"fmt"
	"net/http"
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

	_ = app.writeJSON(w, http.StatusOK, payload)
}

// AllMovies handler handles the all movies page
func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.DB.AllMovies()
	if err != nil {
		app.errorJSON(w, fmt.Errorf("cannot fetch movies: %w", err))
		return
	}

	_ = app.writeJSON(w, http.StatusOK, movies)
}
