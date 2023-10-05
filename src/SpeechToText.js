import React, { useState } from "react";
const speech = require("@google-cloud/speech");
const fs = require("fs");

const SpeechToText = ({ audioBlob }) => {
  const [transcription, setTranscription] = useState("");

  const transcribeAudio = async () => {
    const client = new speech.SpeechClient({
      keyFilename: "path-to-your-credentials.json", // Provide the path to your credentials file
    });

    const audioBytes = fs.readFileSync(audioBlob);

    const audio = {
      content: audioBytes.toString("base64"),
    };

    const config = {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    };

    const request = {
      audio: audio,
      config: config,
    };

    try {
      const [response] = await client.recognize(request);
      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");
      setTranscription(transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <div>
      <button onClick={transcribeAudio}>Transcribe Audio</button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
