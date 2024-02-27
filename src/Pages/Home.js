import React, { useState, useRef, createRef } from "react";
import { sensMSGToOpenAI } from "./chat";
import Tiger from "../assets/Tiger.png";
import Fox from "../assets/Fox.png";
import Owl from "../assets/Owl.png";
import Bird from "../assets/Pecker.png";
import { useScreenshot, createFileName } from "use-react-screenshot";

const Home = () => {
  const ref = createRef(null);
  const [screenImage, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const [submittedText, setSubmittedText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageUrls = [Tiger, Fox, Owl, Bird];

  const generateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomUrl = imageUrls[randomIndex];
    setImage(randomUrl);
  };

  const handleSubmit = (image, { name = "img", extension = "jpg" } = {}) => {
    if (image) {
      setLoading(true);
      sensMSGToOpenAI({
        prompt: "Describe the image for me.",
        image: image,
        model: "gpt-4-vision-preview", // For Image analysis use this model
        tokens: 500, // no of response length
      }).then((res) => {
        setSubmittedText(res?.choices[0]?.message?.content);
        setLoading(false);
      });
    } else {
      alert("No Screen Shot Captured");
    }
  };

  const downloadScreenshot = () =>
    takeScreenShot(ref.current).then(handleSubmit);

  useState(() => {
    generateRandomImage();
  }, []);
  return (
    <div
      style={{
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: 800, border: "1px solid black", padding: 50 }}>
        <h1>Welcome to OPEN AI Screen Analysis</h1>
        <p>Click On "Analyse My Screen" to analyse what's on your screen</p>
        {/* the Below ref defines the container that will be captures for image analysis, change the ref according to your project needs */}
        <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
          {image && (
            <img
              src={image}
              style={{ alignSelf: "center", marginBottom: 20 }}
              width="800"
              height="600"
              alt="Description of the image"
            />
          )}
        </div>
        <button
          style={{ height: 50, marginBottom: 30 }}
          onClick={downloadScreenshot}
        >
          Analyse My Screen
        </button>

        <br />
        {/* Display submitted text */}
        {loading && <p style={{ fontWeight: "bold" }}> ANALYSING IMAGE ...</p>}
        {submittedText && (
          <div style={{ width: 800 }}>
            <p style={{ fontWeight: "bold" }}> RESULT</p>
            <p style={{ whiteSpace: "pre-wrap" }}> {submittedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
