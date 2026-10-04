# Task API

A RESTful Task Management API built with **Node.js, Express, TypeScript, and PostgreSQL**.

This project was built to practice backend development fundamentals, including REST API design, PostgreSQL database integration, database migrations, controllers, routing, request validation, error handling, and CRUD operations.

## Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — Web framework
* **TypeScript** — Type-safe JavaScript
* **PostgreSQL** — Relational database
* **node-pg-migrate** — Database migration management
* **pg** — PostgreSQL client for Node.js
* **dotenv** — Environment variable management

---

## Features

* Create a task
* Retrieve all tasks
* Retrieve a single task by ID
* Update a task
* Delete a task
* PostgreSQL database integration
* Database migrations
* Environment-based configuration
* Controller-based request handling
* RESTful API structure
* Basic error handling

---

## Project Structure

```text
task-api/
│── database/
|   └──migrations/
|         └── <migrayion-files>
├── src/
│   ├── controllers/
│   │   └── tasks.controller.ts
│   │
│   ├── config/
│   │   └── db.ts
│   │   
│   │       
│   │
│   ├── routes/
│   │   └── tasks.routes.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```



---

# Getting Started

## Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* PostgreSQL
* npm
* Git

You can verify Node.js and npm:

```bash
node --version
npm --version
```

Verify PostgreSQL:

```bash
psql --version
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/aashish-adk1/task-api.git
```

Move into the project directory:

```bash
cd task-api
```

## 2. Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_api
DB_USER=postgres
DB_PASSWORD=test-password
DATABASE_URL=postgres://postgres:YOUR_DATABASE_PASSWORD@localhost:5432/task_api
```

Replace the PostgreSQL username, password, and database name with your local PostgreSQL configuration.

### Example

```env
PORT=YOUR_PORT_NUMBER
DB_HOST=YOUR_HOST
DB_PORT=5432(default)
DB_USER=postgres(default)
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=YOUR_DATABASE_NAME
DATABASE_URL=YOUR_DATABASE_URL
```

> Never commit your actual `.env` file or database credentials to GitHub.

---

# Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE taskdb;
```

After configuring your `.env`, run the database migrations:

```bash
npm run migrate
```

The migration will create the required `tasks` table.

---

# Running the Application

## Development

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

If you are using a different port, replace `5000` with the port specified in your `.env` file.

---

# API Endpoints

Base URL:

```text
http://localhost:5000
```

## Tasks

| Method   | Endpoint     | Description             |
| -------- | ------------ | ----------------------- |
| `GET`    | `/tasks`     | Get all tasks           |
| `GET`    | `/tasks/:id` | Get a task by ID        |
| `POST`   | `/tasks`     | Create a new task       |
| `PATCH`  | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task           |

---

# 1. Get All Tasks

### Request

```http
GET /tasks
```

### Example

```bash
curl http://localhost:5000/tasks
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn Express",
      "description": "Build a REST API using Express",
      "completed": false,
      "createdAt": "2026-10-04T05:00:00.000Z",
      "updatedAt": "2026-10-04T05:00:00.000Z"
    }
  ]
}
```

---

# 2. Get Task by ID

### Request

```http
GET /tasks/:id
```

### Example

```bash
curl http://localhost:5000/tasks/1
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Express",
    "description": "Build a REST API using Express",
    "completed": false,
    "createdAt": "2026-10-04T05:00:00.000Z",
    "updatedAt": "2026-10-04T05:00:00.000Z"
  }
}
```

If the task does not exist, the API returns an appropriate error response.

---

# 3. Create a Task

### Request

```http
POST /tasks
```

### Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "title": "Learn PostgreSQL",
  "description": "Understand PostgreSQL queries and relationships"
}
```

### Example

```bash
curl -X POST http://localhost:5000/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Learn PostgreSQL\",\"description\":\"Understand PostgreSQL queries and relationships\"}"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Learn PostgreSQL",
    "description": "Understand PostgreSQL queries and relationships",
    "completed": false,
    "createdAt": "2026-10-04T05:00:00.000Z",
    "updatedAt": "2026-10-04T05:00:00.000Z"
  }
}
```

---

# 4. Update a Task

### Request

```http
PATCH /tasks/:id
```

### Example

```http
PATCH /tasks/2
```

### Request Body

You can update the fields supported by the API.

```json
{
  "title": "Learn PostgreSQL deeply",
  "completed": true
}
```

### Example

```bash
curl -X PATCH http://localhost:5000/tasks/2 \
-H "Content-Type: application/json" \
-d "{\"completed\":true}"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Learn PostgreSQL deeply",
    "description": "Understand PostgreSQL queries and relationships",
    "completed": true,
    "createdAt": "2026-10-04T05:00:00.000Z",
    "updatedAt": "2026-10-04T05:30:00.000Z"
  }
}
```

---

# 5. Delete a Task

### Request

```http
DELETE /tasks/:id
```

### Example

```bash
curl -X DELETE http://localhost:5000/tasks/2
```

### Response

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

# Database Schema

The application currently uses a `tasks` table.

| Column        | Type        | Description            |
| ------------- | ----------- | ---------------------- |
| `id`          | Integer     | Unique task identifier |
| `title`       | String/Text | Task title             |
| `description` | Text        | Task description       |
| `completed`   | Boolean     | Task completion status |
| `createdAt`   | Timestamp   | Task creation time     |
| `updatedAt`   | Timestamp   | Last update time       |

---

# API Architecture

The API follows a basic separation of responsibilities:

```text
Client
  │
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Database
  │
  ▼
PostgreSQL
```

### Routes

Routes define the available API endpoints and connect incoming requests to their corresponding controller handlers.

### Controllers

Controllers handle incoming requests, interact with the database, and return HTTP responses.

### Database

The PostgreSQL connection is managed separately from the route and controller logic.

### Migrations

Database schema changes are managed using `node-pg-migrate`.

---

# Database Migrations

Create and apply database migrations using:

```bash
npm run migrate
```

Migrations allow the database schema to be created and changed in a controlled and reproducible way instead of manually modifying the database.

---

# Testing the API

The API can be tested using tools such as:

* Postman
* Insomnia
* Thunder Client
* cURL

Recommended testing flow:

```text
1. Start PostgreSQL
        ↓
2. Start the API server
        ↓
3. Create a task
        ↓
4. Get all tasks
        ↓
5. Get task by ID
        ↓
6. Update the task
        ↓
7. Get the updated task
        ↓
8. Delete the task
        ↓
9. Confirm the task no longer exists
```

---

# Environment

This project currently uses a **local PostgreSQL database** for development.

The database is not included in the repository.

To run the project, each developer must create their own PostgreSQL database and configure the `DATABASE_URL` environment variable.

---

# Future Improvements

Possible improvements for future versions include:

* User authentication
* JWT-based authentication
* Role-based authorization
* User-specific tasks
* Request validation
* Pagination
* Filtering and sorting
* Automated tests
* API documentation with Swagger/OpenAPI
* Docker support
* Production deployment
* CI/CD pipeline

---

# Learning Goals

This project was built as a backend learning project to gain practical experience with:

* Node.js
* Express.js
* TypeScript
* REST API development
* PostgreSQL
* SQL
* Database migrations
* CRUD operations
* Backend project structure
* Git and GitHub

The goal was to understand how a backend application receives requests, processes them, communicates with a relational database, and returns appropriate responses.

---

# Author

**Aashish Adhikari**

* GitHub: [@aashish-adk1](https://github.com/aashish-adk1)
* Portfolio: [aashishadhikari007.com.np](https://aashishadhikari007.com.np/)

---

## License

This project is available for learning and educational purposes.
