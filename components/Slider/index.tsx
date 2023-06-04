import React, { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.css"; // Import CSS module

const Slider: React.FC<{
  fileName: string;
  setFileName: (fileName: string) => void;
}> = ({ fileName, setFileName }) => {
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
    <div
      className={`${styles.mainSlider}` + `${
        submitted || fileName ? styles.moveOut : ""
      }`}
    >
      <div className={styles.sliderContent}>
        <div>
          <Image
            src="/LogoCodeKage.svg"
            alt="CodeKage Logo"
            width={300}
            height={100}
          />
          <form onSubmit={handleSubmit} className={styles.sliderForm}>
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
