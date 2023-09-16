import React from "react";
import { useGlobalContext } from "../Context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favoriteMovies, setMovieId, movieDetails } = useGlobalContext();

  const handleGetMovieInfo = (id) => {
    setMovieId(id);
    console.log(movieDetails);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <section className="favorites-container">
      {favoriteMovies && favoriteMovies.length > 0 ? <h1>Favorites</h1> : ""}
      {favoriteMovies && (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          //ssr={true} // means to render carousel on server-side.
          infinite={false}
          //autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px">
          {favoriteMovies.map((movie) => {
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
                      <Link to={`movie/${movie.id}`} className="link">
                        <button
                          className="btn"
                          onClick={() => handleGetMovieInfo(movie.id)}>
                          More Info
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="movie-card-details">
                  <h2 className="movie-title" data-testid={movie.title}>
                    {movie.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </section>
  );
};

export default Favorites;
