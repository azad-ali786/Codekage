import React, { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import Editor, { loader } from "@monaco-editor/react";

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

const CodeEditor: React.FC<CodeEditorProps> = ({
  fileName,
  setFileName,
  userId,
  code,
  setCode,
}) => {
  const [buttonClicked, setButtonClicked] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleSaveCode = async () => {
    try {
      await saveCode(fileName, code, userId);
      debouncedSaveCode.cancel();
      showCustomAlert("Code saved");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeChange = (value: any, event: any): void => {
    setCode(value);
  };

  const debouncedSaveCode = _debounce(handleSaveCode, 15000);

  const handleButtonClicked = () => {
    setButtonClicked((prevCount) => prevCount + 1);
  };

  const showCustomAlert = (message: string) => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000); // Hide the alert after 3 seconds
  };

  useEffect(() => {
    debouncedSaveCode();

    return () => {
      debouncedSaveCode.cancel();
    };
  }, [code]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      loader.init().then((monaco) => {
        monaco.editor.defineTheme("myTheme", {
          base: "vs",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#efefef",
          },
        });
      });
    }
  });

  return (
    <div>
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
            {isAlertVisible ? "Saved" : "Save"}
          </button>
          <button onClick={handleButtonClicked} className={styles.button}>
            Run
          </button>
        </div>
      </div>
      <div className={styles.editorLine}>
        <Editor
          theme="myTheme"
          language="javascript"
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
