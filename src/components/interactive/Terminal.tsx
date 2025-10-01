import { useState, useEffect, type SetStateAction } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  const commands: Record<string, string | (() => string)> = {
    help: "Available commands: [help, mission, join, clear]",
    mission: "Our mission is to defend the WPS digital frontier through code, awareness, and cybersecurity.",
    join: "Connecting to secure server... To join, enlist in our Discord community. The link is above.",
    clear: () => {
      setOutput([]);
      return "";
    },
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    let response = `> ${input}`;

    if (command in commands) {
      const commandResponse = typeof commands[command] === "function" ? (commands[command] as () => string)() : (commands[command] as string);
      setOutput((prev) => [...prev, response, commandResponse].filter(Boolean));
    } else {
      setOutput((prev) => [...prev, response, `Error: Command '${command}' not found. Type 'help' for options.`]);
    }
    setInput("");
  };

  useEffect(() => {
    setOutput(["Welcome to the ATIN 'TO! Operation Center.", "Type 'help' to see available commands."]);
  }, []);

  return (
    <div className="bg-black/80 border border-neon-green/50 p-4 rounded-lg font-mono text-sm h-96 flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {output.map((line, index) => (
          <p key={index} className="text-white whitespace-pre-wrap">
            {line.startsWith(">") ? <span className="text-neon-green">{line}</span> : line}
          </p>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="flex items-center mt-4">
        <span className="text-neon-green mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="bg-transparent border-none text-white w-full focus:outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
