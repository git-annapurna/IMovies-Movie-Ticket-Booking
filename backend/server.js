const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('IMovies Backend Server is Running!');
});

// Sample movies — no database required
const movies = [
  {
    _id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    description: 'A thief enters people’s dreams to steal secrets.'
  },
  {
    _id: '2',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    rating: 8.7,
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description: 'Explorers travel through space to find a new home for humanity.'
  },
  {
    _id: '3',
    title: 'The Dark Knight',
    genre: 'Action',
    rating: 9.0,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    description: 'Batman faces the Joker in Gotham City.'
  }
];

// Get all movies
app.get('/api/movies', (req, res) => {
  console.log('GET /api/movies route reached');
  res.json(movies);
});

console.log('Movies API route registered');
app.get('/api/diagnostic', (req, res) => {
  res.json({
    server: 'IMovies-HARDCODED-TEST',
    status: 'working'
  });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});