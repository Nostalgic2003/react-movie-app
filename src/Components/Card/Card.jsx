import './Card.css';
import React from 'react';

const Card = ({ movie, onClick }) => {
    if (!movie) return null;

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

    return (
        <div className="Movie" onClick={onClick}>
            {posterUrl && <img src={posterUrl} alt={movie.title} id="movies" />}
            <span>{movie.title}</span>
        </div>
    );
}

export default Card;