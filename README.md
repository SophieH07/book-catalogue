# Book Catalogue DLBCSJWD01 project

A full-stack Book Catalogue application where users can upload and manage their books. The application is built with:

- Frontend: React, Vite, Tailwind CSS.
- Backend: Node.js, Express, MongoDB.
- Database: MongoDB for storing book data.

## First steps

**Clone repository and go into the containing folder**

```
git clone https://github.com/{your-username}/book-catalogue.git
cd book-catalogue
```

**Create .env files based on the sample.env file both in backend and frontend folders!**

## Prerequisites

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)</br>
Install [Node](https://nodejs.org/en/download/package-manager)</br>
Install [MongoDB](https://www.mongodb.com/try/download/community)</br>

## Starting with Docker

**Building and Starting**

```
docker-compose up --build
```

This command will:

- Build Docker images for the backend, frontend, and MongoDB.
- Start all services (MongoDB, backend, frontend).

It may take some time to create everything.

**Access the Application:**

- Frontend: http://localhost:39573
- Backend API for all books: http://localhost:39500/api/books

**Stopping the application**

```
docker-compose down
```

## Starting locally

**Start MongoDB**

```
mongod
```

**Open a terminal or a command prompt and run the following to connect the mongoDb**

```
mongosh
use admin
db.runCommand({ connectionStatus: 1 })
```

**Start backend**

```
cd backend
npm install
node app.js
```

You can check the backend by this http://localhost:39500/api/books link, where you will see a JSON about the books you uploaded. At the beginning it will be empty.

**Start frontend**

```
cd frontend
npm install
npm run dev
```

The frontend should be available on http://localhost:39573.

## Functionality

- Add book -> dropdown, adds new book
- All/Read/Unread tabs: shows all books by filter
- Read/Unread checkboxs: toggles the read status and updates the last updated time -- also: if you stand on the Read or Unread tabs, it jumps back to All books
- Delete: deletes book
