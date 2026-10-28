import { useState, useEffect } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'
import SeatSelection from './components/SeatSelection'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)

const [movies, setMovies] = useState([])

useEffect(() => {
  fetch('http://localhost:5001/api/movies')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load movies')
      }
      return response.json()
    })
    .then(data => setMovies(data))
    .catch(error => console.error(error))
}, [])

  return (
    <div className="app">
      <header>
        <h1>🎬 IMovies</h1>

        <nav>
          <a href="#home" onClick={() => setSelectedMovie(null)}>
            Home
          </a>
          <a href="#movies" onClick={() => setSelectedMovie(null)}>
            Movies
          </a>
          <a href="#about">About</a>
        </nav>
      </header>

      {selectedMovie ? (
        <SeatSelection
          key={selectedMovie.id}
          movie={selectedMovie}
          onBack={() => setSelectedMovie(null)}
        />
      ) : (
        <>
          <main id="home">
            <h2>Book Your Favourite Movie Tickets</h2>

            <p>
              Discover movies and enjoy a simple ticket-booking experience.
            </p>

            <a className="explore-button" href="#movies">
              Explore Movies
            </a>
          </main>

          <section id="movies">
            <h2>Now Showing</h2>

            <div className="movie-container">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  genre={movie.genre}
                  rating={movie.rating}
                  poster={
  movie.id === 1
    ? "/posters/inception.jpg"
    : movie.id === 2
    ? "/posters/interstellar.jpg"
    : "/posters/dark-knight.jpg"
}
                  onBook={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      <footer id="about">
        <p>© 2026 IMovies. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App