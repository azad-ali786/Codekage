import React, { useEffect, useRef } from "react";
import { runCode } from "../../utils/api";
import "xterm/css/xterm.css";

type TerminalProps = {
  code: string;
  buttonClicked: number;
};

const Terminal: React.FC<TerminalProps> = ({ code, buttonClicked }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<any>(null);

  const handleRunCode = async () => {
    try {
      const output = await runCode(code); // Run the code through the API
      console.log("Code executed successfully");
      terminal.current.write(output + "\n"); // Write the output to the terminal
    } catch (error) {
      console.error("Code execution failed:", error);
    }
  };

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("xterm");

      terminal.current = new Terminal({
        cursorBlink: true,
      });

      if (terminalRef.current) {
        terminal.current.open(terminalRef.current);

        // Delay the focus call to ensure terminal is fully initialized
        setTimeout(() => {
          terminal.current.focus();
        }, 0);
      }

      return () => {
        if (terminal.current) {
          terminal.current.dispose();
        }
      };
    };
    initTerminal();
  }, []);

  useEffect(() => {
    handleRunCode();
  }, [buttonClicked]);

  return (
    <div className="bg-black text-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-end mb-2">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="h-24 bg-gray-900 p-2 overflow-y-auto" ref={terminalRef} />
    </div>
  );
};

export default Terminal;
