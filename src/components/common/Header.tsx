import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-neon-green/20 text-neon-green" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? "bg-neon-green/20 text-neon-green" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <header className="bg-cyber-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 border-b border-neon-green/30">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold text-neon-green font-mono">
            ATIN 'TO!
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/dossier" className={navLinkClass}>
              The Dossier
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              Intel Briefs
            </NavLink>
            <NavLink to="/map" className={navLinkClass}>
              Mission Map
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/dossier" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              The Dossier
            </NavLink>
            <NavLink to="/blog" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              Intel Briefs
            </NavLink>
            <NavLink to="/map" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              Mission Map
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
