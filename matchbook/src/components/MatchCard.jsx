import React, { useState } from "react";

function MatchCard({ team1, team2, date, venue, ticketPrice }) {
  // Each card manages its own booking count independently.
  const [bookingCount, setBookingCount] = useState(0);

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
      </div>
      <div className="card-bottom">
        <div className="price">
          <span>Tickets from</span>
          <strong>${ticketPrice}</strong>
        </div>
        <button
          className="button button-book"
          type="button"
          onClick={() => setBookingCount((count) => count + 1)}
        >
          Book Now
        </button>
      </div>
      <p className="booking-count" aria-live="polite">
        {bookingCount} {bookingCount === 1 ? "booking" : "bookings"} made
      </p>
    </article>
  );
}

export default MatchCard;
