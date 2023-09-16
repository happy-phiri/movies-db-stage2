import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Favorites from "./Favorites";

const Header = () => {
  const { setSearchTerm, fetchSearchedMovie } = useGlobalContext();
  const [text, setText] = useState("");

  const handleFormInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(text);
  };

  const handleSearchMovie = () => {
    fetchSearchedMovie();
  };

  return (
    <nav className="header">
      <div className="search">
        <Link to="/">
          <img
            src="/logo2.svg"
            alt="the movie database logo"
            className="logo"
          />
        </Link>
        <form className="search-form" onClick={handleSubmit}>
          <input
            type="text"
            placeholder="Enter movie title"
            onChange={handleFormInput}
            value={text}
            required
          />

          <Link to={`result/${text}`}>
            {text ? (
              <button onClick={() => handleSearchMovie} className="btn">
                Search
              </button>
            ) : (
              <button
                onClick={() => handleSearchMovie}
                className="btn"
                disabled>
                Search
              </button>
            )}
          </Link>
        </form>
      </div>
      <div className="hero">
        <Favorites />
      </div>
    </nav>
  );
};

export default Header;
