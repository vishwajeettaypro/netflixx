import React, { useEffect } from 'react';
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";

const Header = () => {
  
  useEffect(() => {
    const header = document.querySelector('.header');

    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.add('scrolled'); // Add the "scrolled" class
      } else {
        header.classList.remove('scrolled'); // Remove the "scrolled" class when at the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link className="link" to="/tvshows">TV Shows</Link>
        <Link className="link" to="/movies">Movies</Link>
        <Link className="link" to="/recent">Recently Added</Link>
        <Link className="link" to="/mylist">My List</Link>
      </div>
      <ImSearch />
    </nav>
  );
};

export default Header;
