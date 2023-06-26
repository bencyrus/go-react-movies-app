package main

import (
	"backend/internal/repository"
	"backend/internal/repository/dbrepo"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

const port = 7070

type application struct {
	DSN          string
	Domain       string
	DB           repository.DatabaseRepo
	auth         Auth
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
	APIKey       string
}

func main() {
	// Set application config
	var app application

	// Read from command line
	dbConnectionString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable timezone=UTC connect_timeout=5", os.Getenv("DB_URL"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	flag.StringVar(&app.DSN, "dsn", dbConnectionString, "PostgreSQL Connection String")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "verysecret", "signing secret")
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "signing issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "signing audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "domain")
	flag.StringVar(&app.APIKey, "api-key", "d4fcb053095960306d80ca64ba8b274a", "API key")
	flag.Parse()

	// Connect to database
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}

	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:             app.JWTIssuer,
		Audience:           app.JWTAudience,
		Secret:             app.JWTSecret,
		TokenExpiry:        time.Minute * 15,
		RefreshTokenExpiry: time.Hour * 24,
		CookiePath:         "/",
		CookieDomain:       app.CookieDomain,
		CookieName:         "Host-refresh_token",
	}

	// Start HTTP server
	log.Println("Starting server on port:", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
