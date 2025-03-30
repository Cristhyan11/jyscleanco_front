import React from 'react';
import '../styles/Home.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Products />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
