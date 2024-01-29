import React, { useEffect } from 'react';
import Typed from 'typed.js';

const MyHeader = () => {
  useEffect(() => {
    const typed = new Typed('.title', {
      strings: ['on track'],
      typeSpeed: 100,
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []); 

  return (
    <header className="text-center py-8">
      <h1 className="text-5xl font-bold">
        <h2>let's get back</h2>
        <span className="title"></span>
      </h1>
    </header>
  );
};

export default MyHeader;
