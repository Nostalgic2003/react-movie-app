import './HomePage.css';
import React, { useState, useEffect } from 'react';
import Card from '../Card/Card.jsx';
import Modal from '../Modal/Modal.jsx';

const API_KEY = "&api_key=af4079dfc409a0b868ca357766d6d8de";
const BASE_URL = "https://api.themoviedb.org/3"; 
const URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc${API_KEY}`;

const HomePage = ({ searchTerm }) => {
    const [movieData, setData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(data => setData(data.results.slice(0, 18)))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredMovies = movieData.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="HomePage">
            <div className="container">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <Card key={movie.id} movie={movie} onClick={() => { setSelectedMovie(movie); setModalOpen(true); }} />
                    ))
                ) : (
                    <div className="error-msg"><p>Movie Not Found</p></div>
                )}
            </div>
            {isModalOpen && selectedMovie && <Modal movie={selectedMovie} onClose={() => setModalOpen(false)} />}
        </div>
    );
}

export default HomePage;