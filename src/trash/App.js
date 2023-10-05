import logo from "./logo.svg";
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

/* <video
          ref={(videoElement) => {
            if (videoElement) videoElement.srcObject = stream;
          }}
          autoPlay
  /> */

/* import React, { useState } from "react";
import { SpeechToTextClient } from "@google-cloud/speech-to-text";

const App = () => {
  const [transcription, setTranscription] = useState("");

  const handleStartListening = async () => {
    // Create a new SpeechToTextClient object.
    const client = new SpeechToTextClient();

    // Create a new SpeechToTextRequest object.
    const request = {
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
    };

    // Start listening for speech input.
    const stream = await client.streamingRecognize(request);

    // Transcribe the speech input.
    stream.on("data", (data) => {
      setTranscription(data.results[0].alternatives[0].transcript);
    });

    // Stop listening for speech input.
    stream.on("end", () => {
      client.close();
    });
  };

  return (
    <div>
      <button onClick={handleStartListening}>Start Listening</button>
      <p>{transcription}</p>
    </div>
  );
};

export default App;
 */

/* import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const [transcription, setTranscription] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSpeechRecognition = (transcript) => {
    setTranscription(transcript);
  };

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <p>{transcript}</p>
    </div>
  );
};

export default App; */

/* import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

function App() {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const webcamRef = useRef(null);

  const toggleWebCam = () => {
    setIsWebcamOn(!isWebcamOn);
  };

  return (
    <div className="App">
      <h1>Webcam App</h1>
      <button onClick={toggleWebCam}>Toggle Webcam</button>
      {isWebcamOn && <Webcam audio={false} ref={webcamRef} />}
    </div>
  );
} 
export default App;

*/
