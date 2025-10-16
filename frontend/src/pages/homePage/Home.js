import React from 'react';
import './Home.css';
import Navbar from './components/Navbar';
import BookCenterWrapper from './components/book';

function Home() {
  return (
    <div>
      <Navbar />
      <BookCenterWrapper />
    </div>
  );
}

export default Home;
