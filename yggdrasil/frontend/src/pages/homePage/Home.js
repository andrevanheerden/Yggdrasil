import React from 'react';
import './Home.css';
import Navbar from './components/Navbar';
import Book from './components/book';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="book-center-wrapper">
        <Book />
      </div>
    </div>
  );
}

export default Home;
