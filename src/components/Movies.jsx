import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Movies = () => {
  const {
    movies,
    loading,
    setMovieId,
    movieDetails,
    setFavoriteMovies,
    favoriteMovies,
  } = useGlobalContext();

  const handleGetMovieInfo = (id) => {
    setMovieId(id);
    console.log(movieDetails);
  };

  const handleAddToFavorites = (item) => {
    setFavoriteMovies((prevState) => {
      return [item, ...prevState];
    });
    console.log(favoriteMovies);
  };

  if (loading) {
    return (
      <section className="movies-container">
        <img src="/Spinner-1s-200px.svg" alt="Spinning wheel" />
      </section>
    );
  } else {
    if (!movies.results) {
      return (
        <section className="movies-container">
          <h1>No items found</h1>
        </section>
      );
    } else {
      return (
        <section className="movies-container">
          <h1>Trending Movies</h1>
          <div className="movie-cards">
            {movies.results.map((movie) => {
              return (
                <div className="movie-card" key={movie.id}>
                  <div className="movie-card-image">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/image-not-found.jpg"
                      }
                      alt={movie.original_title}
                    />
                    <div className="movie-info-overlay">
                      <div className="content">
                        <p data-testid="movie-overview">
                          {movie.overview.length > 200
                            ? `${movie.overview.substring(0, 200)} . . .`
                            : movie.overview}
                        </p>
                        <div className="card-btns">
                          <Link to={`movie/${movie.id}`} className="link">
                            <button
                              className="btn"
                              onClick={() => handleGetMovieInfo(movie.id)}>
                              More Info
                            </button>
                          </Link>
                          <button
                            className="fav-btn"
                            onClick={() => handleAddToFavorites(movie)}>
                            <FontAwesomeIcon
                              icon={faHeart}
                              size="2xl"
                              className="fav-icon"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="movie-card-details">
                    <h2 className="movie-title" data-testid="movie-title">
                      {movie.title}
                    </h2>
                    <p
                      className="movie-release"
                      data-testid="movie-release-date">
                      Released on {movie.release_date}
                    </p>
                    <p className="movie-rating">
                      Viewer Rating - {movie.vote_average.toFixed(2)} / 10
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  }
};

export default Movies;
