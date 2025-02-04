import React, { useRef, useEffect, useCallback } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

function App() {
  const title = document.querySelector('h1');
  typeWriterEffect(title);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = useCallback(async () => {
    const net = await cocossd.load();

    setInterval(() => {
      detect(net);
    }, 10);
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const objects = await net.detect(video);
      console.log(objects);

      const ctx = canvasRef.current.getContext("2d");

      drawRect(objects, ctx);
    }
  };

  useEffect(() => { runCoco() }, [runCoco]);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        muted={true}
        style={{
          borderRadius: 10
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          right: 45
        }}
      />
    </div>
  );
}

function typeWriterEffect(element) {
  const textArray = element.innerHTML.split('');
  element.innerHTML = '';
  for (let i = 0; i < textArray.length; i++) {
    setTimeout(() => element.innerHTML += textArray[i], 75 * i);
  }
}

export default App;