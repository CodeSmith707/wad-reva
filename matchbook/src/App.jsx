import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MatchCard from "./components/MatchCard.jsx";
import { supabase } from "./supabase.js";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingMatchId, setBookingMatchId] = useState(null);
  const [message, setMessage] = useState(null);

  const loadMatches = useCallback(async (showLoading = true) => {
    if (!supabase) {
      setIsLoading(false);
      setMessage({
        type: "error",
        text: "Add your Supabase URL and publishable key to matchbook/.env to load matches.",
      });
      return false;
    }

    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("match_date", { ascending: true });

      if (error) {
        setMessage({ type: "error", text: `Could not load matches: ${error.message}` });
        return false;
      }

      setMatches(data);
      return true;
    } catch (error) {
      setMessage({
        type: "error",
        text: `Could not connect to Supabase: ${error.message}`,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();

    if (!supabase) {
      return undefined;
    }

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        () => {
          loadMatches(false);
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setMessage({
            type: "error",
            text: "Live match updates are unavailable. Check your Supabase Realtime settings.",
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadMatches]);

  async function handleBook(matchId, customerName, seatsBooked) {
    const match = matches.find((item) => item.id === matchId);
    const trimmedName = customerName.trim();

    if (!trimmedName || !Number.isInteger(seatsBooked) || seatsBooked < 1) {
      setMessage({ type: "error", text: "Enter your name and a valid number of seats." });
      return false;
    }

    if (!match || seatsBooked > match.available_seats) {
      setMessage({
        type: "error",
        text: "There are not enough seats available for this booking. Please try again.",
      });
      await loadMatches();
      return false;
    }

    setBookingMatchId(matchId);
    setMessage(null);

    try {
      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          match_id: matchId,
          customer_name: trimmedName,
          seats_booked: seatsBooked,
        });

      if (bookingError) {
        setMessage({
          type: "error",
          text: `Could not save your booking: ${bookingError.message}`,
        });
        return false;
      }

      const { data: updatedMatches, error: updateError } = await supabase
        .from("matches")
        .update({ available_seats: match.available_seats - seatsBooked })
        .eq("id", matchId)
        .gte("available_seats", seatsBooked)
        .select("id");

      if (updateError) {
        await loadMatches(false);
        setMessage({
          type: "error",
          text: `Your booking was recorded, but available seats could not be updated: ${updateError.message}`,
        });
        return false;
      }

      if (!updatedMatches?.length) {
        await loadMatches(false);
        setMessage({
          type: "error",
          text: "Your booking was recorded, but the match's seat count changed. Please contact the organizer.",
        });
        return false;
      }

      const matchesLoaded = await loadMatches(false);
      if (!matchesLoaded) {
        setMessage({
          type: "error",
          text: "Your booking was saved, but the match list could not be refreshed. Reload the page to see the latest seats.",
        });
        return true;
      }

      setMessage({ type: "success", text: "Your tickets have been booked successfully." });
      return true;
    } catch (error) {
      setMessage({
        type: "error",
        text: `Could not complete the booking: ${error.message}`,
      });
      return false;
    } finally {
      setBookingMatchId(null);
    }
  }

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
            {message && (
              <p className={`app-message ${message.type}`} role="status">
                {message.text}
              </p>
            )}
          </div>
          <div className="match-grid">
            {isLoading ? (
              <p className="matches-state">Loading matches...</p>
            ) : matches.length ? (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={new Date(match.match_date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  venue={match.venue}
                  ticketPrice={match.ticket_price}
                  availableSeats={match.available_seats}
                  onBook={handleBook}
                  isBooking={bookingMatchId === match.id}
                />
              ))
            ) : (
              !message && <p className="matches-state">No matches are available right now.</p>
            )}
          </div>
        </section>
        <section className="bookings-note" id="bookings">
          <span className="bookings-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <h2>Your match bookings</h2>
            <p>
              Choose a match, enter your name and the number of seats, then book.
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
