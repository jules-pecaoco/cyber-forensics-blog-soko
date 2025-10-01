import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import AnimatedSection from "../components/common/AnimatedSection";
import GlitchText from "../components/common/GlitchText";
import { TypeAnimation } from "react-type-animation";

interface DossierCardProps {
  title: string;
  text: string;
}

const DossierCard = ({ title, text }: DossierCardProps) => (
  <Card className="bg-black/50 border-neon-green/50 text-white">
    <CardHeader>
      <CardTitle className="text-neon-green">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <TypeAnimation
        sequence={[text, 5000]} // Text and hold duration
        wrapper="p"
        speed={70} // Typing speed
        cursor={true}
        repeat={Infinity}
        style={{ whiteSpace: "pre-line" }}
      />
    </CardContent>
  </Card>
);

const DossierPage = () => {
  const dossierData = [
    {
      title: "Strategic Importance",
      text: "The WPS is a critical artery for global trade, a rich source of marine biodiversity, and holds significant oil and gas reserves. Its strategic location makes it a focal point of geopolitical interest.",
    },
    {
      title: "The 2016 Arbitral Ruling",
      text: "In 2016, the Permanent Court of Arbitration in The Hague ruled in favor of the Philippines, invalidating China's 'nine-dash line' claim. This landmark decision affirmed our sovereign rights.",
    },
    {
      title: "The Digital Battlefield",
      text: "Modern sovereignty isn't just physical; it's digital. The battle for the WPS is also fought through information campaigns, maritime surveillance data, and cybersecurity of our critical infrastructure.",
    },
  ];

  return (
    <AnimatedSection>
      <div className="container mx-auto p-4 font-mono">
        <GlitchText text="WPS Dossier: Declassified" />
        <p className="text-gray-400 mt-2 mb-8">Decrypting key intelligence on the West Philippine Sea...</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dossierData.map((item) => (
            <DossierCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default DossierPage;
