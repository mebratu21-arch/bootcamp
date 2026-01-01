# Day 4: React Router + API Connection Exercise

## Database Server Setup

This folder contains exercises for React Router with API integration using JSON Server.

## How to Run the Database Server

Open a **new terminal** and run:

```bash
json-server --watch src/day-4/db.json --port 3000
```

The server will start at: **http://localhost:3000**

## Available API Endpoints

Once the server is running, you can access:

- **Users**: http://localhost:3000/users
- **Products**: http://localhost:3000/products  
- **Posts**: http://localhost:3000/posts

## API Operations

### GET (Read)
```javascript
// Get all users
fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(data => console.log(data));

// Get single user by ID
fetch('http://localhost:3000/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

### POST (Create)
```javascript
fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New User',
    email: 'new@example.com',
    age: 30
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### PUT (Update)
```javascript
fetch('http://localhost:3000/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    name: 'Updated Name',
    email: 'updated@example.com',
    age: 29
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### DELETE
```javascript
fetch('http://localhost:3000/users/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Exercise Ideas

1. **Fetch and Display Users**: Create a component that fetches users from the API and displays them
2. **Add New User Form**: Build a form to add new users to the database
3. **Product Catalog**: Fetch products and display them with routing
4. **Blog Posts**: Create a blog page that displays posts from the API
5. **Delete Functionality**: Add delete buttons to remove items
6. **Edit Form**: Create an edit page that updates existing data

## Running Both Servers

You need TWO terminals running:

1. **Terminal 1** - React dev server (already running):
   ```bash
   npm run dev
   ```
   Access at: http://localhost:5173

2. **Terminal 2** - JSON Server:
   ```bash
   json-server --watch src/day-4/db.json --port 3000
   ```
   Access at: http://localhost:3000

## Tips

- The database changes are saved in `db.json`
- Use React `useEffect` to fetch data when component loads
- Use React `useState` to store the fetched data
- Don't forget to handle loading states and errors!
