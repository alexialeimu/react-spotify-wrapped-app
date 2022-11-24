import React, { useState, useEffect } from "react";
import axios from "axios";
import TopTrackList from "./components/TopTrackList";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [topData, setTopData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  function handleClick(e) {
    e.preventDefault();

    fetch("http://localhost:8000/getData")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setTopData(data.data);
      });
  }

  return (
    <div className="App">
      <h1>Spotify Wrapped</h1>
      <p>{message}</p>
      <button onClick={handleClick}>Click to get data</button>
      <a href="http://localhost:8000/login">Sign in</a>
      <TopTrackList topTracks={topData} />
    </div>
  );
}

export default App;
