import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import GlitchText from "./common/GlitchText";

const AgendaSection = () => {
  const topics = [
    "Show casing Digital Forensics",
    "CYBER SOVEREIGNTY: Data Privacy as National Concern",
    "Cyber Defenders: What can we do as IT Students?",
    "Help Protect West Phil Sea: ATIN 'TO!",
  ];

  return (
    <Card className="bg-black/50 border-neon-green/50 text-white font-mono">
      <CardHeader>
        <GlitchText text="Agenda For Today" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-xl text-neon-green">CSAM 2025 Participation</h3>
          <p className="text-gray-400">Opening Oct 2, 2025, 8:00am</p>
        </div>
        <div>
          <h3 className="text-xl text-neon-green">Topics/Activities</h3>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {topics.map((topic, index) => (
              <li key={index} className="hover:text-neon-green transition-colors">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaSection;
