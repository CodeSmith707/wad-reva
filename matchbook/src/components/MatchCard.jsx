import React, { useState } from "react";

function MatchCard({
  id,
  team1,
  team2,
  date,
  venue,
  ticketPrice,
  availableSeats,
  onBook,
  isBooking,
}) {
  const [customerName, setCustomerName] = useState("");
  const [seatQuantity, setSeatQuantity] = useState("1");

  async function handleSubmit(event) {
    event.preventDefault();
    const booked = await onBook(id, customerName, Number(seatQuantity));

    if (booked) {
      setCustomerName("");
      setSeatQuantity("1");
    }
  }

  return (
    <article className="match-card">
      <div className="match-card-top">
        <span className="match-tag">Upcoming match</span>
        <span className="match-ball" aria-hidden="true">
          ◉
        </span>
      </div>
      <div className="teams">
        <div className="team-name">{team1}</div>
        <span className="versus">VS</span>
        <div className="team-name">{team2}</div>
      </div>
      <div className="match-details">
        <p>
          <span className="detail-icon" aria-hidden="true">
            ◷
          </span>
          {date}
        </p>
        <p>
          <span className="detail-icon" aria-hidden="true">
            ◎
          </span>
          {venue}
        </p>
        <p>
          <span className="detail-icon" aria-hidden="true">
            ♧
          </span>
          {availableSeats} seats available
        </p>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            maxLength={100}
            required
            disabled={availableSeats === 0 || isBooking}
          />
        </label>
        <label>
          Seats
          <input
            type="number"
            min="1"
            max={availableSeats}
            value={seatQuantity}
            onChange={(event) => setSeatQuantity(event.target.value)}
            required
            disabled={availableSeats === 0 || isBooking}
          />
        </label>
        <div className="card-bottom">
          <div className="price">
            <span>Ticket price</span>
            <strong>₹{ticketPrice}</strong>
          </div>
          <button
            className="button button-book"
            type="submit"
            disabled={availableSeats === 0 || isBooking}
          >
            {availableSeats === 0
              ? "Sold Out"
              : isBooking
                ? "Booking..."
                : "Book Now"}
          </button>
        </div>
      </form>
    </article>
  );
}

export default MatchCard;
