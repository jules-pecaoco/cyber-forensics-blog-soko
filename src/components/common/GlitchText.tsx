import "./GlitchText.css";

interface GlitchTextProps {
  text: string;
}

const GlitchText = ({ text }: GlitchTextProps) => {
  return (
    <div className="glitch" data-text={text}>
      {text}
    </div>
  );
};

export default GlitchText;
