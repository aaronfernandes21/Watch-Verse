// Modal.js
import React from "react";
import "./Modal.css"; // We'll add some CSS for styling

const Modal = ({ movie, onClose }) => {
  if (!movie) return null; // Do nothing if no movie is selected

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>

        {/* YouTube Trailer */}
        {movie.video && (
          <div className="trailer-container">
            <iframe
              title="Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Cast Details */}
        {movie.cast && (
          <div className="cast-grid">
            {movie.cast.slice(0, 8).map((actor) => (
              <div key={actor.id} className="cast-card">
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/185x278?text=No+Image"}
                  alt={actor.name}
                />
                <p><strong>{actor.name}</strong></p>
                <p>as {actor.character}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
