import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import TopTrackList from './components/TopTrackList';
import Navbar from './components/Navbar';
import './App.css';

// pages
import Home from './pages/Home';
import About from './pages/TopLists';
import TopLists from './pages/TopLists';

function App() {
    const [message, setMessage] = useState('');
    const [topData, setTopData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/message')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    function handleClick(e) {
        e.preventDefault();

        fetch('http://localhost:8000/getData')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setTopData(data.data);
            });
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <main class="container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home message={message} />}
                        />
                        <Route
                            path="toplists"
                            element={
                                <TopLists
                                    topTracks={topData}
                                    handleClick={handleClick}
                                />
                            }
                        />
                    </Routes>
                </main>
                {/* <Navbar />
                <div class="container">
                    <p>{message}</p>
                    <TopTrackList topTracks={topData} />
                    <button onClick={handleClick}>
                        Click to get data
                    </button>
                </div> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
