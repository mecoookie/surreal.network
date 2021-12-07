import React from "react";
import logo from "./logo.svg";
import preview from "./preview.jpg";

function App() {
  return (
    <div className="App w-screen bg-black">
      <div className="container mx-auto w-screen h-screen">
        <img src={preview} />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-white">SURREAL</h1>
          <h1 className="text-xl text-white">Minting Soon</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
