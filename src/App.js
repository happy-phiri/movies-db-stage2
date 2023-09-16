import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import SearchResults from "./components/SearchResults";
import MovieInfo from "./components/MovieInfo";
import Error from "./components/Error";
import { useGlobalContext } from "./Context";

function App() {
  const { movieId, searchTerm } = useGlobalContext();
  return (
    <Router>
      <main className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path={`result/${searchTerm}`} element={<SearchResults />} />
          <Route
            path={`movie/${movieId}`}
            element={movieId ? <MovieInfo /> : <Error />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
