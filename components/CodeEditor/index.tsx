import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import _debounce from "lodash/debounce";

import Terminal from "../Terminal";
import styles from "./CodeEditor.module.css"; // Import CSS module

import { saveCode } from "@/utils/api";

interface CodeEditorProps {
  fileName: string;
  setFileName: (fileName: string) => void;
  userId: string;
  code: string;
  setCode: (fileName: string) => void;
}

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const CodeEditor: React.FC<CodeEditorProps> = ({
  fileName,
  setFileName,
  userId,
  code,
  setCode,
}) => {
  const [buttonClicked, setButtonClicked] = useState(0);

  const handleSaveCode = async () => {
    try {
      await saveCode(fileName, code, userId);
      console.log("Code saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const debouncedSaveCode = _debounce(handleSaveCode, 15000);

  const handleButtonClicked = () => {
    setButtonClicked((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    debouncedSaveCode();

    return () => {
      debouncedSaveCode.cancel();
    };
  }, [code]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="fileNameInput">
            File Name:
          </label>
          <input
            id="fileNameInput"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <button onClick={handleSaveCode} className={styles.button}>
            Save
          </button>
          <button onClick={handleButtonClicked} className={styles.button}>
            Run
          </button>
        </div>
      </div>
      <div className="flex-1 mb-4" style={{ height: "400px" }}>
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{ minimap: { enabled: false } }}
        />
      </div>
      <Terminal code={code} buttonClicked={buttonClicked} />
    </div>
  );
};

export default CodeEditor;
