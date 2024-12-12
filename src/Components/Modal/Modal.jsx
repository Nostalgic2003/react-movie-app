import './Modal.css';
import React from 'react';

const Modal = ({ movie, onClose }) => {
    if (!movie) return null;

    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

    return (
        <div className="Modal">
            <div className="modal-overlay">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-content">
                    <img src={posterUrl} alt={movie.title} id="movie" />
                    <div className="details-wrapper">
                        <div className='details'>
                            <h2>{movie.title}</h2>
                            <div className="data">
                                <p>{movie.release_date.slice(0, 4)}</p>
                                <iconify-icon icon="lucide:dot"></iconify-icon>
                                <div className="ratings">
                                    <iconify-icon icon="openmoji:star"></iconify-icon>
                                    <p>{movie.vote_average}</p>
                                </div>
                            </div>
                            <p id="overview">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;