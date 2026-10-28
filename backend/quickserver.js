const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;
const bookingsFile = path.join(__dirname, 'bookings.json');

const movies = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
  },
  {
    id: 2,
    title: 'Interstellar',
    genre: 'Adventure',
    rating: 8.7,
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    genre: 'Action',
    rating: 9.0,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  }
];

function readBookings() {
  if (!fs.existsSync(bookingsFile)) {
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(bookingsFile, 'utf8'));
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

app.get('/', (req, res) => {
  res.send('IMovies Backend Working!');
});

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/bookings', (req, res) => {
  res.json(readBookings());
});

app.post('/api/bookings', (req, res) => {
  const { movieId, seats } = req.body;

  const movie = movies.find(
    item => item.id === Number(movieId)
  );

  if (
    !movie ||
    !Array.isArray(seats) ||
    seats.length === 0 ||
    !seats.every(
      seat =>
        Number.isInteger(seat) &&
        seat >= 1 &&
        seat <= 20
    ) ||
    new Set(seats).size !== seats.length
  ) {
    return res.status(400).json({
      message: 'Invalid booking details'
    });
  }

  const bookings = readBookings();

  const booking = {
    id: Date.now().toString(),
    movieId: movie.id,
    movieTitle: movie.title,
    seats,
    totalPrice: seats.length * 200,
    bookedAt: new Date().toISOString()
  };

  bookings.push(booking);

  try {
    fs.writeFileSync(
      bookingsFile,
      JSON.stringify(bookings, null, 2)
    );

    return res.status(201).json({
      message: 'Booking successful',
      booking
    });
  } catch (error) {
    console.error('Error saving booking:', error);

    return res.status(500).json({
      message: 'Could not save booking'
    });
  }
});

app.listen(PORT, () => {
  console.log(`IMovies Backend running on port ${PORT}`);
});