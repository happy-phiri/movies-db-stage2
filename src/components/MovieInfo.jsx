import React from "react";
import { useGlobalContext } from "../Context";

const MovieInfo = () => {
  const { movieDetails, loading } = useGlobalContext();

  if (loading) {
    return (
      <section>
        <img src="/Spinner-1s-200px.svg" alt="Spinning wheel" />
      </section>
    );
  } else {
    console.log(movieDetails);
    return (
      <section className="movie-details">
        <div className="info-hero">
          <div className="hero-poster">
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
                  : "/image-not-found.jpg"
              }
              alt={movieDetails.title}
            />
          </div>
          <div className="hero-info">
            <h1 data-testid="movie-title">{movieDetails.title}</h1>
            <p className="overview" data-testid="movie-overview">
              {movieDetails.overview}
            </p>
            <p data-testid="movie-runtime">
              Runtime: {movieDetails.runtime} minutes
            </p>
            <p data-testid="movie-release-date">
              Released: {movieDetails.release_date}
            </p>
            <p>Rating: {movieDetails.vote_average}/10</p>
          </div>
        </div>
      </section>
    );
  }
};

export default MovieInfo;
