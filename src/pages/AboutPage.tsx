// src/pages/AboutPage.jsx
import React from "react";
import AnimatedSection from "../components/common/AnimatedSection";
import GlitchText from "../components/common/GlitchText";
import ProfileCard from "../components/common/ProfileCard";

// Dummy data for team members
const teamMembers = [
  {
    id: 1,
    name: "Pecaoco, Jules Alfonz R.  ",
    role: "Lead Analyst & Strategist",
    avatar: "https://i.pravatar.cc/150?u=glitchgarcia",
    bio: "Specializes in geopolitical analysis and digital forensics. Oversees all operations and ensures the integrity of our mission.",
  },
  {
    id: 2,
    name: '"Navarro, Mark Angelo C.',
    role: "OSINT Specialist",
    avatar: "https://i.pravatar.cc/150?u=firewallsantos",

    bio: "Master of open-source intelligence. Gathers and analyzes publicly available data to uncover hidden truths and counter disinformation.",
  },
  {
    id: 3,
    name: '"Batac, Jeanne Francis',
    role: "Cybersecurity Engineer",
    avatar: "https://i.pravatar.cc/150?u=hexreyes",

    bio: "Builds and maintains our digital defenses. An expert in network security and threat mitigation, protecting our assets from state-sponsored attacks.",
  },
];

const AboutPage = () => {
  return (
    <AnimatedSection>
      <div className="container mx-auto p-4 font-mono text-center">
        <GlitchText text="Command Roster" />
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
          We are a collective of digital specialists, strategists, and patriots dedicated to defending the Philippines' sovereign rights in the
          digital age. Our mandate is clear: protect our national interests through technology, data, and unwavering vigilance.
        </p>

        <div className="mt-12">
          <h2 className="text-3xl text-neon-green mb-8">Meet the Operatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <ProfileCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutPage;
