import React, { useState } from "react";
import Image from "next/image";
import "./Slider.css"; // Import the CSS file

const Slider: React.FC<{ fileName: string; setFileName: (fileName: string) => void }> = ({ fileName,
  setFileName,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileNameInput = event.currentTarget.elements.namedItem(
      "fileNameInput"
    ) as HTMLInputElement;
    setFileName(fileNameInput.value);
    setSubmitted(true);
  };

  return (
    <div className={`main-slider ${submitted || fileName? "move-out" : ""}`}>
      <div className="slider-content">
        <div>
          <Image
            src="/LogoCodeKage.svg"
            alt="CodeKage Logo"
            width={300}
            height={100}
          />
          <form onSubmit={handleSubmit} className="slider-form">
            <input
              type="text"
              placeholder="Enter your Filename"
              name="fileNameInput"
              defaultValue={fileName}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Slider;
