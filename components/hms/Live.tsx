import React from 'react';
import Footer from './footer';
import Header from './Header';
import List from './list';
import s from './live.module.css';

/**
 * Live Video/Audio component
 */
const Live = () => {
  return (
    <div className="flex justify-center items-center relative flex-col h-full">
      <Header />
      <List />
      <Footer />
    </div>
  );
};

export default Live;
