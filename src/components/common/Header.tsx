import { NavLink } from "react-router-dom";
// import GlitchText from "./GlitchText";

const Header = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "bg-neon-green/20 text-neon-green" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <header className="bg-cyber-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 border-b border-neon-green/30">
        <NavLink to="/" className="text-xl font-bold text-neon-green font-mono">
          ATIN 'TO!
        </NavLink>
        <nav className="space-x-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/dossier" className={navLinkClass}>
            The Dossier
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Intel Briefs
          </NavLink>
          <NavLink to="/take-action" className={navLinkClass}>
            Operation Center
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
