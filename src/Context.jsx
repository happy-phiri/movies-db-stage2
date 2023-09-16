/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsFound, setResultsFound] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [movieDetails, setMovieDetails] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );

  const trending = `https://api.themoviedb.org/3/trending/movie/day?language=en-US?api_key=a718a8c95a73aa13ba0a074ab6175f8d`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${searchTerm}&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US?api_key=a718a8c95a73aa13ba0a074ab6175f8d&append_to_response=credits`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE4YThjOTVhNzNhYTEzYmEwYTA3NGFiNjE3NWY4ZCIsInN1YiI6IjY0ZTQ3ZTlhMWZlYWMxMDExYjJiMTY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpgc6SU5J5FiIdjMy8rxrVa4PpmR2UZLXnd_nxr7oWI",
    },
  };

  // FETCH TRENDING MOVIES ON HOMEPAGE
  const fetchTrendingMovies = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => setMovies(response));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingMovies(trending);
  }, [trending]);

  //FETCH SEARCH RESULTS
  const fetchSearchedMovie = async () => {
    setLoading(true);
    try {
      await fetch(searchUrl, options)
        .then((response) => response.json())
        .then((response) => setResultsFound(response));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!searchTerm) return;
    fetchSearchedMovie();
  }, [searchUrl]);

  // GET MORE INFO ABOUT A SPECIFIC MOVIE
  const fetchMovieDetails = async (url) => {
    setLoading(true);
    try {
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => setMovieDetails(response));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!movieId) return;
    fetchMovieDetails(movieDetailsUrl);
  }, [movieId]);

  // SAVE FAVORITE MOVIES TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <AppContext.Provider
      value={{
        movies,
        loading,
        setSearchTerm,
        searchTerm,
        resultsFound,
        fetchSearchedMovie,
        setMovieId,
        movieId,
        movieDetails,
        favoriteMovies,
        setFavoriteMovies,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
