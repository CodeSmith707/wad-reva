import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MatchCard from "./components/MatchCard.jsx";
import "./App.css";

const matches = [
  {
    id: 1,
    team1: "Mumbai Meteors",
    team2: "Chennai Strikers",
    date: "Saturday, 14 June 2026 · 7:30 PM",
    venue: "Harbour Stadium, Mumbai",
    ticketPrice: 45,
  },
  {
    id: 2,
    team1: "Bengaluru Falcons",
    team2: "Delhi Royals",
    date: "Sunday, 15 June 2026 · 6:00 PM",
    venue: "Garden Arena, Bengaluru",
    ticketPrice: 38,
  },
  {
    id: 3,
    team1: "Kolkata Knights",
    team2: "Hyderabad Hawks",
    date: "Friday, 20 June 2026 · 7:00 PM",
    venue: "Riverside Ground, Kolkata",
    ticketPrice: 52,
  },
];

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="matches-section" id="matches">
          <div className="section-heading">
            <p className="eyebrow">Live the game</p>
            <h2>Upcoming matches</h2>
            <p>Pick a matchup and reserve your place in the crowd.</p>
          </div>
          <div className="match-grid">
            {/* map() renders a reusable card for each match; id gives each one a unique key. */}
            {matches.map((match) => (
              <MatchCard key={match.id} {...match} />
            ))}
          </div>
        </section>
        <section className="bookings-note" id="bookings">
          <span className="bookings-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <h2>Your match bookings</h2>
            <p>
              Book a match above and see your booking count update on its card.
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#home">
          MatchBook
        </a>
        <p>Make every match day one to remember.</p>
      </footer>
    </>
  );
}

export default App;
