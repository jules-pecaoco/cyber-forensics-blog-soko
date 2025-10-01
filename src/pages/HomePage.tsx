import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlitchText from "../components/common/GlitchText";
import { Button } from "../components/ui/button";
import { Map, Users, FileText, ChevronDown } from "lucide-react";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  const facts = [
    "2016 Arbitral Ruling: Philippines won against China's claims",
    "90% of Filipino fishermen depend on WPS for livelihood",
    "7 major reefs illegally militarized since 2013",
    "$26B worth of natural resources at stake in Reed Bank",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: "url('/src/assets/wps-background.jpg')",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #00ff00 1px, transparent 1px),
                linear-gradient(to bottom, #00ff00 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-scan" />
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="py-12">
          {/* Status Bar */}
          <div className="mb-8 font-mono text-xs md:text-sm text-green-400 border border-green-400/30 bg-black/50 backdrop-blur-sm px-4 py-2 rounded">
            <span className="animate-pulse">●</span> SYSTEM ACTIVE | SOVEREIGNTY DEFENSE PROTOCOL ENGAGED
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <GlitchText text="ATIN 'TO!" />
            <div className="mt-2 text-cyan-400 text-sm md:text-lg font-mono tracking-widest">[ WEST PHILIPPINE SEA DEFENSE INITIATIVE ]</div>
          </div>

          {/* Typewriter Mission Statement */}
          <p className="mt-6 text-base md:text-xl text-gray-300 font-mono max-w-3xl mx-auto leading-relaxed">
            A <span className="text-green-400 font-bold">digital frontier</span> for defending our sovereignty in the{" "}
            <span className="text-cyan-400 font-bold">West Philippine Sea</span>.
            <br className="hidden md:block" />
            This is a call to action for every Filipino <span className="text-yellow-400 font-bold">IT student</span> and{" "}
            <span className="text-yellow-400 font-bold">professional</span>.
          </p>

          {/* Rolling Facts Banner */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="border-l-4 border-red-500 bg-black/60 backdrop-blur-sm p-4 rounded-r">
              <div className="text-red-400 text-xs font-mono mb-1">[CRITICAL INTEL]</div>
              <div className="text-white text-sm md:text-base font-mono transition-all duration-500">{facts[currentFact]}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-green-400 text-black hover:bg-green-500 font-mono text-base px-8 py-6 shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.8)]"
            >
              <Link to="/dossier" className="flex items-center gap-2">
                <FileText size={20} />
                Analyze The Dossier
              </Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <ChevronDown className="text-green-400 w-8 h-8 mx-auto" />
            <div className="text-green-400 text-xs font-mono mt-2">SCROLL TO EXPLORE</div>
          </div>
        </motion.div>
      </div>

      {/* Quick Access Cards Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
              <span className="text-green-400">[</span>
              <span className="text-white">MISSION BRIEFING</span>
              <span className="text-green-400">]</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="py-12"
            >
              <Link to="/map" className="group block">
                <div className="border-2 border-green-400/30 bg-black/50 backdrop-blur-sm p-6 rounded-lg hover:border-green-400 hover:bg-green-400/5 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] h-full">
                  <Map className="text-green-400 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">TACTICAL MAP</h3>
                  <p className="text-gray-400 text-sm font-mono leading-relaxed">
                    Interactive intelligence map showing contested territories, militarized zones, and Philippine sovereign areas.
                  </p>
                  <div className="mt-4 text-green-400 text-xs font-mono group-hover:translate-x-2 transition-transform">ACCESS MAP →</div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-12"
            >
              <Link to="/dossier" className="group block">
                <div className="border-2 border-cyan-400/30 bg-black/50 backdrop-blur-sm p-6 rounded-lg hover:border-cyan-400 hover:bg-cyan-400/5 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] h-full">
                  <FileText className="text-cyan-400 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">THE DOSSIER</h3>
                  <p className="text-gray-400 text-sm font-mono leading-relaxed">
                    Comprehensive archive of events, violations, and the 2016 Arbitral Ruling that affirmed Philippine sovereignty.
                  </p>
                  <div className="mt-4 text-cyan-400 text-xs font-mono group-hover:translate-x-2 transition-transform">REVIEW FILES →</div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-12"
            >
              <Link to="/take-action" className="group block">
                <div className="border-2 border-yellow-400/30 bg-black/50 backdrop-blur-sm p-6 rounded-lg hover:border-yellow-400 hover:bg-yellow-400/5 transition-all hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] h-full">
                  <Users className="text-yellow-400 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-yellow-400 mb-2 font-mono">MOBILIZE</h3>
                  <p className="text-gray-400 text-sm font-mono leading-relaxed">
                    Join the digital resistance. Learn how IT professionals can contribute to defending our maritime rights.
                  </p>
                  <div className="mt-4 text-yellow-400 text-xs font-mono group-hover:translate-x-2 transition-transform">JOIN NOW →</div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="relative z-10 py-16 px-4 border-y border-green-400/30 bg-black/70 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="text-4xl md:text-5xl font-bold text-green-400 font-mono">2016</div>
              <div className="text-sm text-gray-400 font-mono mt-2">Arbitral Victory</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="py-12"
            >
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono">7+</div>
              <div className="text-sm text-gray-400 font-mono mt-2">Militarized Reefs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-12"
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 font-mono">200</div>
              <div className="text-sm text-gray-400 font-mono mt-2">Nautical Mile EEZ</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-12"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-400 font-mono">100%</div>
              <div className="text-sm text-gray-400 font-mono mt-2">Filipino Territory</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="relative z-10 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
              <span className="text-white">THE FIGHT IS </span>
              <span className="text-red-400">NOT OVER</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-mono leading-relaxed mb-8">
              Despite international law, harassment continues. Filipino fishermen are blocked. Our sovereignty is challenged daily.{" "}
              <span className="text-green-400 font-bold">But we stand strong.</span>
            </p>
            <div className="inline-block border-2 border-green-400 bg-green-400/10 px-6 py-3 rounded">
              <span className="text-green-400 text-2xl md:text-3xl font-bold font-mono">🇵🇭 ATIN ANG WEST PHILIPPINE SEA 🇵🇭</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
