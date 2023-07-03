# Movie Repository

This repository is a full-stack application for a movie repository where users can add, edit, delete, and search for movies. User authentication is enforced using JWT.

## Architecture

The application is split into a backend and a frontend. The backend is a REST API written in Go and the frontend is built with React, where routing is also handled using react-router-dom v6. 

## Backend

The backend is built using Go with several packages for handling various aspects of the application:

- `github.com/go-chi/chi/v5` for multiplexer
- `github.com/golang-jwt/jwt/v5` for JWT-based authentication
- `github.com/graphql-go/graphql` for implementing GraphQL
- `github.com/jackc/pgx/v5` for interacting with the PostgreSQL database

The full list of dependencies is available in the `go.mod` file.

## Frontend

The frontend is built with React and handles routing within the application.

## Database

PostgreSQL is used as the database for this project.

## How to Run

### Backend

- Navigate to the backend directory
- Run the backend with `go run ./cmd/api`

### Frontend

- Navigate to the frontend directory
- Install the necessary dependencies with `npm install`
- Run the frontend with `npm start`

### Database

- Make sure PostgreSQL is installed and running on your machine
- Configure the database connection details in your backend application

## Contributions

This is a test project. Contributions, issues, and feature requests are welcome!

## Author

Ben Cyrus
