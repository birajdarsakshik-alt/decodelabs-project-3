# DecodeLabs Project 3 - Student Management API

## Project Objective

This project integrates a SQLite database with the DecodeLabs backend API and implements persistent student data storage with CRUD operations.

## Technology Stack

- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript
- REST API

## Features

- SQLite database integration
- Student database schema
- Create student
- Read students
- Read student by ID
- Update student
- Delete student
- Input validation
- Parameterized SQL queries
- JSON API responses
- HTTP status codes
- Automatic database and table creation

## Database Schema

The students table contains:

- id - INTEGER PRIMARY KEY AUTOINCREMENT
- name - TEXT NOT NULL
- email - TEXT NOT NULL UNIQUE
- course - TEXT NOT NULL
- year - TEXT NOT NULL
- skills - TEXT containing JSON data

## API Endpoints

| Operation | Method | Endpoint |
|---|---|---|
| Create | POST | /api/students |
| Read All | GET | /api/students |
| Read One | GET | /api/students/:id |
| Update | PUT | /api/students/:id |
| Delete | DELETE | /api/students/:id |

## Running the Project

Install dependencies:

    npm install

Start the server:

    npm start

Server:

    http://localhost:3000

## CRUD Testing

CREATE - POST /api/students - Successfully tested.

READ - GET /api/students - Successfully tested.

UPDATE - PUT /api/students/1 - Successfully tested.

DELETE - DELETE /api/students/1 - Successfully tested.

Final GET verification returned:

    {"success":true,"count":0,"data":[]}

## Project Status

Project 3 - Database Integration: COMPLETED

## Developer

Sakshi Birajdar

Full Stack Development Trainee - DecodeLabs Batch 2026
