import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://www.omdbapi.com/?apikey=279f33bf";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim()) {
      fetchMovies();
    }
  }, [query, page]);

  const fetchMovies = async () => {
    const response = await fetch(`${API_URL}&s=${query}&page=${page}`);
    const data = await response.json();

    if (data.Search) {
      setMovies((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovies([]);
    setPage(1);
    fetchMovies();
  };

  // Function to replace broken images with a default placeholder
  const handleImageError = (event) => {
    event.target.src = "https://via.placeholder.com/200x300?text=Image+Not+Available";
  };

  return (
    <div className="container">
      <h1>🎬 Movie Finder</h1>
      
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movies-container">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
              alt={movie.Title}
              onError={handleImageError} // 👈 Handles broken images
            />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>

      {movies.length > 0 && (
        <button className="load-more" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
