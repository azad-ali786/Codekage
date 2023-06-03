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
  const cleanTerminal = () => {
    if (terminal.current) {
      terminal.current.clear();
    }
  };

  const handleRunCode = async () => {
    try {
      cleanTerminal();
      const output = await runCode(code);
      console.log(output);
      const lines = output.split("\n");
      lines.forEach((line: string) => {
        terminal.current.writeln(line);
      });
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

  return <div ref={terminalRef} />;
};

export default Terminal;
