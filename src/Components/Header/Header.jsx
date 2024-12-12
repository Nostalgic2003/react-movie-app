import './Header.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useState, useEffect } from 'react';

const Header = ({ setSearchTerm }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="Header">
            <img src={isMobile ? './logo.png' : 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'} alt="Logo" />
            <SearchBar setSearchTerm={setSearchTerm} />
        </div>
    );
}

export default Header;