# IMovies – Movie Ticket Booking System

## Project Overview
IMovies is a full-stack movie ticket booking application developed using React.js, Node.js, and Express.js. It allows users to browse movies, select seats, calculate ticket prices, and confirm bookings.

## Technologies Used
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Storage:** JSON file-based storage

## Features
- Browse available movies
- View movie posters, genres, and ratings
- Select and deselect seats
- Calculate ticket prices
- Confirm movie ticket bookings
- Generate unique booking IDs
- Save booking information in a JSON file
- Retrieve booking records through an API

## How to Run

### Prerequisites
- Node.js and npm installed
- Visual Studio Code or another code editor

### Backend
Open a terminal in the project folder and run:

```bash
cd backend
npm install
node quickserver.js
```

The backend runs on port **5001**.

### Frontend
Open a **separate terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

Keep both terminals running while using the application.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/movies` | Retrieve available movies |
| GET | `/api/bookings` | Retrieve saved bookings |
| POST | `/api/bookings` | Create a new booking |

## Future Improvements
- User authentication
- MongoDB integration
- Online payment integration
- Real-time seat availability
- Booking history for individual users

## Storage Note
This project currently uses a JSON file to store booking information. It is intended as a minor academic project and does not yet include production-grade database or payment functionality.