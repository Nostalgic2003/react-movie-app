import './styles.css';
import React, { useState } from 'react';
import Header from './Components/Header/Header.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm} />
      <HomePage searchTerm={searchTerm} />
      <Footer logo="./logo.png" title="Nekplek Logo" />
    </div>
  );
}

export default App;