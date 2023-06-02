import React from "react";
import CodeEditor from "../CodeEditor";
import NavBar from "../NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col items-center p-8 w-screen h-screen">
      <NavBar />
      <div className="flex mb-8">
          <CodeEditor />
      </div>
    </div>
  );
};

export default Layout;
