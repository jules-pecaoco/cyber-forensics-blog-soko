import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import AnimatedSection from "../components/common/AnimatedSection";
import GlitchText from "../components/common/GlitchText";

const TakeActionPage = () => {
  return (
    <AnimatedSection>
      <div className="container mx-auto p-4 font-mono text-center">
        <GlitchText text="Operation Center" />
        <p className="text-gray-400 mt-2 mb-8">Your mission, should you choose to accept it.</p>

        <Card className="max-w-2xl mx-auto bg-black/50 border-neon-green/50 text-left">
          <CardHeader>
            <CardTitle className="text-neon-green">Mission Directives for IT Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>1. Code for a Cause:</strong> Contribute to open-source projects for maritime domain awareness. Develop tools for data
              visualization and tracking.
            </p>
            <p>
              <strong>2. Counter-Disinformation:</strong> Use your digital literacy skills to identify and report fake news and foreign information
              manipulation campaigns targeting the WPS narrative.
            </p>
            <p>
              <strong>3. Secure our Cyberspace:</strong> Promote cybersecurity best practices. Participate in Capture The Flag (CTF) events with a
              focus on national security.
            </p>
            <div className="pt-4">
              <Button className="w-full bg-neon-green text-black hover:bg-neon-green/80">Join the Digital Defenders Discord</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
};

export default TakeActionPage;
