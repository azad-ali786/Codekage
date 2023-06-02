import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { getCode, saveCode, runCode } from "../../utils/api";

import Terminal from "../Terminal"
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");
  const [userId, setUserId] = useState("");
  const [buttonClicked, setButtonClicked] = useState(0);

  const getRandomUserId = useCallback(() => {
    let userId = localStorage.getItem("userIdCodekage");
    if (!userId) {
      userId = Math.random().toString(36).substring(7);
      localStorage.setItem("userIdCodekage", userId);
    }
    return userId;
  }, []);

  const fetchCode = useCallback(async (userId:string) => {
    try {
      const response = await getCode(userId);
      const { fileName, code } = response;
      setFileName(fileName);
      setCode(code);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCodeChange = (newCode:string) => {
    setCode(newCode);
  };

  const handleSaveCode = async () => {
    try {
      await saveCode(fileName, code, userId);
      console.log("Code saved successfully");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleButtonClicked = () => {
    setButtonClicked((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const userIdValue = getRandomUserId();
    setUserId(userIdValue);
    if (userIdValue) {
      fetchCode(userIdValue);
    }
  }, [getRandomUserId, fetchCode]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="text-sm font-bold" htmlFor="fileNameInput">
            File Name:
          </label>
          <input
            id="fileNameInput"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <button
            onClick={handleSaveCode}
            className="py-2 px-4 bg-blue-500 text-white rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleButtonClicked}
            className="py-2 px-4 bg-green-500 text-white rounded"
          >
            Run
          </button>
        </div>
      </div>
      <div className="flex-1 mb-4" style={{ height: "500px" }}>
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
