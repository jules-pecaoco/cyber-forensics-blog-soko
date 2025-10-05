import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import DossierPage from "./pages/DossierPage";
import BlogPage from "./pages/BlogPage";
import TakeActionPage from "./pages/TakeActionPage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-bg text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dossier" element={<DossierPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/take-action" element={<TakeActionPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
