import React, { useCallback, useEffect, useState } from "react";
import CodeEditor from "../CodeEditor";
import NavBar from "../NavBar";
import Slider from "../Slider";
import { getCode } from "@/utils/api";

const Layout = () => {
  const [fileName, setFileName] = useState("");
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");
  
   const handleGetCode = useCallback(async (userId: string) => {
    try {
      const response = await getCode(userId);
      const { fileName, code } = response;
      setFileName(fileName);
      setCode(code);
    } catch (error) {
      console.error(error);
    }
   }, []);
  
  const getRandomUserId = useCallback(() => {
  let userId = localStorage.getItem("userIdCodekage");
  if (!userId) {
    userId = Math.random().toString(36).substring(7);
    localStorage.setItem("userIdCodekage", userId);
  }
  return userId;
  }, []);
  
  useEffect(() => {
    const userIdValue = getRandomUserId();
    setUserId(userIdValue);
    if (userIdValue) {
      handleGetCode(userIdValue);
    }
  }, [getRandomUserId, handleGetCode]);

  return (
    <>
      <Slider fileName={fileName} setFileName={setFileName} />
      <NavBar />
      <CodeEditor
        fileName={fileName}
        setFileName={setFileName}
        userId={userId}
        code={code}
        setCode={setCode}
      />
    </>
  );
};

export default Layout;
