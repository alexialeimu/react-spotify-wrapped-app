import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  function handleClick(e) {
    e.preventDefault();

    fetch("http://localhost:8000/getData")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="App">
      <h1>{message}</h1>
      <button onClick={handleClick}>Click to get data</button>
      <a href="http://localhost:8000/login">Sign in</a>
    </div>
  );
}

export default App;
