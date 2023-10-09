import "./App.css";

import React, { useState } from "react";
import speech from "@google-cloud/speech";

const client = new speech.SpeechClient();

const encoding = "FLAC";
const sampleRateHertz = 48000;
const languageCode = "en-US";

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    audioChannelCount: 1,
  },
  interimResults: false,
};

function App() {
  const [stream, setStream] = useState(null);

  const [transcription, setTranscription] = useState("");

  /* const recognizeStream = client
    .streamingRecognize(request)
    .on("error", console.error)
    .on("data", (data) => {
      setTranscription(data.results[0].alternatives[0].transcript);
    }); */

  /* const transcribe = () => {
    stream.pipe(recognizeStream);
  }; */

  const handleButtonClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(mediaStream);
      //transcribe();
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
