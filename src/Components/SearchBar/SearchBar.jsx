import './SearchBar.css';
import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(inputValue);
        setInputValue('');
    };

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                <input type="text" className="searchTerm" placeholder="Search movies..." value={inputValue}onChange={handleInputChange}/>
                <button type="submit" className="searchButton">
                    <iconify-icon icon="mynaui:search"></iconify-icon>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;