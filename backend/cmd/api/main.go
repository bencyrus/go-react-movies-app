package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 7070

type application struct {
	Domain string
}

func main() {
	// Set application config
	var app application

	// Read from command line

	// Connect to database

	app.Domain = "example.com"

	// Start HTTP server
	log.Println("Starting server on port:", port)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}