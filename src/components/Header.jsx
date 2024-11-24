// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-whitesmoke text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-black hover:text-gray-300">
          Nicholas Augusto Bazzoni
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden block focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex space-x-4 absolute  z-50 md:static top-16 left-0 w-full md:w-auto bg-gray-500  md:bg-transparent text-center md:text-left`}
        >
          <Link to="/" className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
            Home
          </Link>
          <Link to="/blog" className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
            Blog
          </Link>
          <Link to="/websites" className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
            Websites
          </Link>
          <Link to="/music" className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
            Music
          </Link>
          <Link to="/about" className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
            Contact
          </Link> 
          {/* <Link to='/subscribe'className="block md:inline-block px-4 py-2 text-black hover:text-gray-300">
          sub
          </Link> */}
          {/* Add more links as needed */}
        </nav>
      </div>
    </header>
  );
}

export default Header;