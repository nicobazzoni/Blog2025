import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="flex space-x-6">
          {/* GitHub Icon */}
          <a
            href="https://github.com/nicobazzoni"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.704-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.07-.608.07-.608 1.003.07 1.53 1.031 1.53 1.031.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.944 0-1.092.39-1.985 1.03-2.684-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025a9.564 9.564 0 012.5-.336c.85.004 1.705.115 2.5.336 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.202 2.393.1 2.646.64.699 1.03 1.592 1.03 2.684 0 3.841-2.337 4.687-4.566 4.934.359.309.678.92.678 1.854 0 1.337-.012 2.417-.012 2.744 0 .268.18.58.688.482C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/nico-bazzoni/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.7c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.7h-3v-5.396c0-1.287-.024-2.946-1.797-2.946-1.797 0-2.073 1.403-2.073 2.851v5.491h-3v-10h2.884v1.367h.041c.402-.761 1.381-1.562 2.841-1.562 3.038 0 3.6 2.01 3.6 4.623v5.572z" />
            </svg>
          </a>
          <Link to='subscribe'>

          Subscribe
            
          </Link>
        </div>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Nico's Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;