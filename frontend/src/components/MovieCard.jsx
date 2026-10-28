
function MovieCard({ title, genre, rating, poster, onBook }) {
  return (
    <div className="movie-card">
      <img src={poster} alt={title} />
      

      <h3>{title}</h3>

      <p>Genre: {genre}</p>

      <p>⭐ {rating}/10</p>

      <button onClick={onBook}>Book Now</button>
    </div>
  )
}

export default MovieCard