import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const navLinks = [
        { name: 'Feed', href: '/feed' },
        { name: 'Events Board', href: '/events' },
        { name: 'Discover', href: '/#discover' },
        { name: 'Community', href: '/#community' },
        { name: 'About', href: '/#about' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-bg-primary py-4 border-black/5 shadow-sm' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold text-text-primary tracking-tight">
                    Culture<span className="font-light italic text-accent-terra">Connect</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium tracking-wide uppercase"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {token ? (
                        <>
                            <span className="text-sm font-bold text-accent-teal">Hi, {username}</span>
                            <button onClick={handleLogout} className="px-6 py-2 border border-text-primary text-text-primary text-sm font-medium hover:bg-bg-secondary transition-colors duration-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-6 py-2 border border-text-primary text-text-primary text-sm font-medium hover:bg-bg-secondary transition-colors duration-300">
                                Login
                            </Link>
                            <Link to="/signup" className="px-6 py-2 bg-text-primary text-bg-primary text-sm font-medium hover:bg-accent-terra transition-colors duration-300">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-primary focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-bg-primary border-b border-black/5 p-6 flex flex-col gap-6 animate-fade-in shadow-xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-text-primary hover:text-accent-terra text-xl font-serif font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    {token ? (
                        <button onClick={handleLogout} className="w-full py-3 border border-text-primary text-text-primary font-medium">
                            Logout
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="w-full text-center py-3 border border-text-primary text-text-primary font-medium">
                                Login
                            </Link>
                            <Link to="/signup" className="w-full text-center py-3 bg-text-primary text-bg-primary font-medium">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
