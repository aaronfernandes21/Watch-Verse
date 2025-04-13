import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAbout, setShowAbout] = useState(false); // About popup state

  const navigate = useNavigate();
  const resultsRef = useRef(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setTrendingMovies(data.results);
    };

    fetchTrendingMovies();
  }, []);

  const searchMovies = async (query) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results);

    // Scroll to the search results
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    navigate("/");
  };

  const toggleAboutPopup = () => {
    setShowAbout(!showAbout); // Toggle the About modal
  };

  return (
    <div className={darkMode ? "App dark" : "App"}>
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo"> WatchVerse</h1>
        <SearchBar onSearch={searchMovies} />
        <div className="navbar-actions">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="about-toggle" onClick={toggleAboutPopup}>
            About
          </button>
        </div>
      </header>

      {/* Trending Movies */}
      <h2 className="section-heading">Trending Movies</h2>
      <MovieGrid movies={trendingMovies} openModal={openModal} />

      {/* Search Results */}
      {movies.length > 0 && (
        <div ref={resultsRef}>
          <h2>🔎 Search Results</h2>
          <MovieGrid movies={movies} openModal={openModal} />
        </div>
      )}

      {/* Movie Modal */}
      {isModalOpen && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              ✖️
            </button>
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
      )}

      {/* About Popup */}
      {showAbout && (
        <div className="about-popup">
          <div className="about-content">
            <h3>About the Creator</h3>
            <p>Created by : Aaron Fernandes</p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/aaronfernandes21"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub handle
              </a>
            </p>
            <p>
              Powered by:{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDB API
              </a>
            </p>
            <button className="close-about" onClick={toggleAboutPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
