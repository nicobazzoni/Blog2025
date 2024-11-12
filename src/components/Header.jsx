// src/components/Header.jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
          Nicholas Augusto Bazzoni
        </Link>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          {/* Add more links as needed for future sections */}
        </nav>
      </div>
    </header>
  );
}

export default Header;