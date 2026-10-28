import { useState } from 'react'

function SeatSelection({ movie, onBack }) {
  const [selectedSeats, setSelectedSeats] = useState([])

  const seats = Array.from({ length: 20 }, (_, index) => index + 1)

  const ticketPrice = 200

  function toggleSeat(seat) {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  async function confirmBooking() {
  if (selectedSeats.length === 0) {
    alert('Please select at least one seat.')
    return
  }

  try {
    const response = await fetch('http://localhost:5001/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieId: movie.id,
        movieTitle: movie.title,
        seats: selectedSeats
      })
    })

    if (!response.ok) {
      throw new Error('Booking failed')
    }

    const data = await response.json()
console.log('Booking API response:', data)
    alert(
      `Booking Confirmed!\nBooking ID: ${data.booking.id}\nMovie: ${movie.title}\nSeats: ${selectedSeats.join(', ')}\nTotal: ₹${data.booking.totalPrice}`
    )

    setSelectedSeats([])
    onBack()

  } catch (error) {
    alert('Booking failed. Please check your backend server.')
    console.error(error)
  }
}
  return (
    <div className="seat-selection">
      <button onClick={onBack}>← Back to Movies</button>

      <h2>Book Tickets for {movie.title}</h2>

      <p>Genre: {movie.genre}</p>
      <p>Rating: ⭐ {movie.rating}/10</p>

      <h3>Select Your Seats</h3>

      <div className="screen">SCREEN</div>

      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat}
            className={
              selectedSeats.includes(seat)
                ? 'seat selected'
                : 'seat'
            }
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>

      <h3>Total Price: ₹{selectedSeats.length * ticketPrice}</h3>

      <button onClick={confirmBooking}>
        Confirm Booking
      </button>
    </div>
  )
}

export default SeatSelection