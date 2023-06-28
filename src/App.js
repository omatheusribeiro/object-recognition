// Import dependencies
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { desenhoRect } from "./utilitarios"

function App() {
  const titulo = document.querySelector('h1');
  escritaTitulo(titulo);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    const net = await cocossd.load();

    setInterval(() => {
      detect(net);
    }, 10);
  };

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

      const obj = await net.detect(video);
      console.log(obj);

      const ctx = canvasRef.current.getContext("2d");

      desenhoRect(obj, ctx);
    }
  };

  useEffect(() => { runCoco() }, []);

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


function escritaTitulo(elemento) {
  const textoArray = elemento.innerHTML.split('');
  elemento.innerHTML = '';
  for (let i = 0; i < textoArray.length; i++) {
    setTimeout(() => elemento.innerHTML += textoArray[i], 75 * i);
  }
}

export default App;
