import "./App.css";

import React, { useState } from "react";

function App() {
  const [stream, setStream] = useState(null);

  const handleButtonClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing the webcam:", error);
    }
  };

  return (
    <div className="App">
      <h1>Webcam App</h1>
      {stream ? (
        <video
          ref={(videoElement) => {
            if (videoElement) videoElement.srcObject = stream;
          }}
          autoPlay
        />
      ) : (
        <button onClick={handleButtonClick}>Turn On Webcam</button>
      )}
    </div>
  );
}

export default App;
