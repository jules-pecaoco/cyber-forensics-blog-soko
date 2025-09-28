// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import GlitchText from "../components/common/GlitchText";
import { Button } from "../components/ui/button";
import AnimatedSection from "../components/common/AnimatedSection";

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cyber-bg bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/wps-background.jpg')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <AnimatedSection>
        <div className="relative z-10 p-4">
          <GlitchText text="ATIN 'TO!" />
          <p className="mt-4 text-lg md:text-xl text-gray-300 font-mono max-w-2xl mx-auto">
            A digital frontier for defending our sovereignty in the West Philippine Sea. This is a call to action for every Filipino IT student and
            professional.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild className="bg-neon-green text-black hover:bg-neon-green/80">
              <Link to="/dossier">Analyze The Dossier</Link>
            </Button>
            <Button asChild variant="outline" className="border-neon-green text-neon-green hover:bg-neon-green/10">
              <Link to="/take-action">Join The Mission</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
