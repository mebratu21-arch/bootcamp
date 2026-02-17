# Task Management API

A RESTful API built with Express.js for managing tasks with JSON file-based storage.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Express Router for organized routing
- ✅ JSON file-based data persistence
- ✅ Request validation
- ✅ Error handling
- ✅ Auto-generated unique IDs
- ✅ Timestamps for task creation and updates

## Installation

1. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get All Tasks
```http
GET /tasks
```

### Get Task by ID
```http
GET /tasks/:id
```

### Create New Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "status": "pending" // optional: pending, in-progress, completed
}
```

### Update Task
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

### Delete Task
```http
DELETE /tasks/:id
```

## Testing with curl

### Create a task:
```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Learn Express\",\"description\":\"Build a REST API\"}"
```

### Get all tasks:
```bash
curl http://localhost:3000/tasks
```

### Get specific task:
```bash
curl http://localhost:3000/tasks/task_1
```

### Update a task:
```bash
curl -X PUT http://localhost:3000/tasks/task_1 -H "Content-Type: application/json" -d "{\"status\":\"completed\"}"
```

### Delete a task:
```bash
curl -X DELETE http://localhost:3000/tasks/task_1
```

## Project Structure

```
task-management-api/
├── server.js           # Main server file
├── routes/
│   └── taskRoutes.js   # Task route handlers
├── utils/
│   ├── fileHandler.js  # File operations
│   └── validation.js   # Input validation
├── tasks.json          # Data storage
├── package.json
└── README.md
```

## Task Object Structure

```json
{
  "id": "task_1",
  "title": "Task title",
  "description": "Task description",
  "status": "pending",
  "createdAt": "2026-01-14T18:28:00.000Z",
  "updatedAt": "2026-01-14T18:28:00.000Z"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## License

ISC
