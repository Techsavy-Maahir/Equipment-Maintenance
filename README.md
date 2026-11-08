# Integrated Maintenance Management System (IMMS)

An Integrated Maintenance Management System built with React, Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Project Structure

```text
maintenance-app/
├── client/       # React frontend
├── server/       # Express backend and Prisma
└── README.md     # Project documentation
```

## Technology Stack

**Frontend**
- React 19
- TypeScript
- Vite
- Axios

**Backend**
- Node.js
- Express 5
- TypeScript
- Prisma ORM

**Database**
- PostgreSQL

## Prerequisites

Install the following before setting up the project:

- Node.js and npm
- PostgreSQL
- A code editor such as Visual Studio Code

## Installation

The frontend and backend have separate package files. Install their dependencies separately.

### 1. Install backend dependencies

```powershell
cd server
npm install
```

### 2. Install frontend dependencies

Open another terminal at the project root:

```powershell
cd client
npm install
```

## Database Configuration

1. Start PostgreSQL.
2. Create a PostgreSQL database for the project using pgAdmin or PostgreSQL tools.
3. Create a `.env` file inside the `server` directory.

Add the following configuration, replacing the database connection details and secret with your own values:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
```

Keep the `.env` file private. Do not commit database passwords or JWT secrets to GitHub.

### Migration status

The existing development and verification databases have been checked and their migration status is up to date.

**Important:** The existing migration history has a known ordering issue that needs to be resolved before a fresh database replay can be documented as reliable. Do not reset an existing database or run seed commands against important data.

## Running the Application

Run the backend and frontend in separate terminals.

### 1. Start the backend

```powershell
cd server
npm run dev
```

The backend uses port `3000` by default.

### 2. Start the frontend

```powershell
cd client
npm run dev
```

Vite uses port `5173` by default.

Open the frontend in your browser:

http://localhost:5173

The frontend sends API requests to:

http://localhost:3000/api

## Testing

### Backend tests

```powershell
cd server
npm test
```

### Backend TypeScript build

```powershell
cd server
npm run build
```

### Frontend tests

```powershell
cd client
npm test
```

### Frontend build

```powershell
cd client
npm run build
```

### Frontend lint

```powershell
cd client
npm run lint
```

## Database Seed Warning

The backend provides a seed command:

```powershell
cd server
npm run seed
```

**Warning:** The current seed script deletes existing equipment, categories, locations, departments, and users before inserting sample records. It is intended only for a disposable test database. Do not run it against a database containing data you need to preserve.

## Security Notes

- Keep `.env` files and credentials private.
- Do not commit database passwords or JWT secrets.
- Use appropriate role-based permissions for protected operations.
- Back up important database data before making schema changes.

## Project Development

IMMS is being developed in stages. The project includes an existing authentication and master-data foundation, with additional maintenance-management modules being implemented according to the project plan.
