import React, { useEffect, useState } from "react";
//import "./MovieDetails.css"; // ✅ Ensure you have this CSS file

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MovieDetails = ({ movie }) => {
  const [videoKey, setVideoKey] = useState(null);
  const [details, setDetails] = useState(movie);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!movie.id) return;
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      const data = await res.json();
      setDetails(data);

      const trailer = data.videos?.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setVideoKey(trailer.key);
    };

    fetchDetails();
  }, [movie]);

  if (!details) return <p>Loading...</p>;

  const genres = details.genres || [];
  const cast = details.credits?.cast || [];

  return (
    <div className="movie-details">
      <h2>{details.title}</h2>
      <p><strong>Release Date:</strong> {details.release_date}</p>
      <p><strong>Genres:</strong> {genres.map(g => g.name).join(", ")}</p>
      <p>{details.overview}</p>

      {videoKey && (
        <div className="trailer">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h3>🎭 Cast</h3>
      <div className="cast-grid">
        {cast.slice(0, 8).map((actor) => (
          <div key={actor.cast_id || actor.id} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={actor.name}
            />
            <p className="actor-name">{actor.name}</p>
            <p className="character-name">as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
