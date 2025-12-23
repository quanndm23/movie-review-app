
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <div className="bg-imdb-yellow text-white font-bold px-2 py-1 rounded text-xl">
                            IMDb
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 ml-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-imdb-yellow font-semibold px-4'
                                    : 'text-white hover:text-imdb-yellow transition px-4'
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-imdb-yellow font-semibold px-4'
                                    : 'text-white hover:text-imdb-yellow transition px-4'
                            }
                        >
                            Search
                        </NavLink>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl ml-auto">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
