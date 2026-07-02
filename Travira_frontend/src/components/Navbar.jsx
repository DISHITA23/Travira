import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, LogOut, Menu, X } from 'lucide-react';
import { logout, getCurrentUser, isAuthenticated } from '../components/services/auth';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const user = getCurrentUser();
    const authenticated = isAuthenticated();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">CodeSphere</h1>
                            <p className="text-xs text-gray-300">Travel Tracking</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {authenticated ? (
                            <>
                                <Link to="/dashboard" className="text-white hover:text-blue-400 transition-colors">
                                    Dashboard
                                </Link>
                                <span className="text-gray-300">Welcome, {user?.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-white hover:text-blue-400 transition-colors">
                                    Home
                                </Link>
                                <Link to="/login" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white">
                                    Login
                                </Link>
                                <Link to="/register" className="px-6 py-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:scale-105 transition-all text-white">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-white/10">
                        <div className="flex flex-col gap-4">
                            {authenticated ? (
                                <>
                                    <Link to="/dashboard" className="text-white hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-left text-red-400 hover:text-red-300"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="text-white hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                                        Home
                                    </Link>
                                    <Link to="/login" className="text-white hover:text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="text-blue-400 hover:text-blue-300" onClick={() => setMobileMenuOpen(false)}>
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;