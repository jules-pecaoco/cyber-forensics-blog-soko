import AnimatedSection from "../components/common/AnimatedSection";
import GlitchText from "../components/common/GlitchText";
import Terminal from "../components/interactive/Terminal";

const TakeActionPage = () => {
  return (
    <AnimatedSection>
      <div className="container mx-auto p-4 font-mono text-center">
        <GlitchText text="Operation Center" />
        <p className="text-gray-400 mt-2 mb-8">Execute commands to proceed.</p>
        <div className="max-w-3xl mx-auto text-left">
          <Terminal />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TakeActionPage;
