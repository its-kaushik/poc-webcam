import React, { useRef, useState } from "react";
import SpeechToText from "./SpeechToText";

const CaptureMedia = () => {
  const videoRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);

      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        setAudioBlob(blob);
      };

      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  return (
    <div>
      <button onClick={startCapture}>Start Capture</button>
      <video ref={videoRef} autoPlay playsInline muted />
      {audioBlob && <SpeechToText audioBlob={audioBlob} />}
    </div>
  );
};

export default CaptureMedia;
