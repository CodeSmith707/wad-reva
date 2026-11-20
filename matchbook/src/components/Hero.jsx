import React from "react";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">Your seat at the big game</p>
        <h1>Book Your Favourite Matches</h1>
        <p className="hero-description">
          Find the match, feel the atmosphere, and be there for every moment.
          Your next unforgettable game day starts here.
        </p>
        <a className="button button-primary" href="#matches">
          Explore Matches <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="hero-art" aria-hidden="true">
        <span className="hero-orbit hero-orbit-one" />
        <span className="hero-orbit hero-orbit-two" />
        <span className="hero-ball">◉</span>
        <span className="hero-star hero-star-one">✦</span>
        <span className="hero-star hero-star-two">✦</span>
      </div>
    </section>
  );
}

export default Hero;
