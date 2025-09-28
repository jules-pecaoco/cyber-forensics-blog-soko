import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import AnimatedSection from "../components/common/AnimatedSection";
import GlitchText from "../components/common/GlitchText";

const DossierPage = () => {
  return (
    <AnimatedSection>
      <div className="container mx-auto p-4 font-mono">
        <GlitchText text="WPS Dossier: Declassified" />
        <p className="text-gray-400 mt-2 mb-8">Key intelligence on the West Philippine Sea.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Importance */}
          <Card className="bg-black/50 border-neon-green/50 text-white">
            <CardHeader>
              <CardTitle className="text-neon-green">Strategic Importance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The WPS is a critical artery for global trade, a rich source of marine biodiversity, and holds significant oil and gas reserves. Its
                strategic location makes it a focal point of geopolitical interest.
              </p>
            </CardContent>
          </Card>

          {/* Card 2: The Hague Ruling */}
          <Card className="bg-black/50 border-neon-green/50 text-white">
            <CardHeader>
              <CardTitle className="text-neon-green">The 2016 Arbitral Ruling</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                In 2016, the Permanent Court of Arbitration in The Hague ruled in favor of the Philippines, invalidating China's "nine-dash line"
                claim. This landmark decision affirmed our sovereign rights.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Cyber & Digital Front */}
          <Card className="bg-black/50 border-neon-green/50 text-white">
            <CardHeader>
              <CardTitle className="text-neon-green">The Digital Battlefield</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Modern sovereignty isn't just physical; it's digital. The battle for the WPS is also fought through information campaigns, maritime
                surveillance data, and cybersecurity of our critical infrastructure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default DossierPage;
