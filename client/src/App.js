import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import TopTrackList from './components/TopTrackList';
import Navbar from './components/Navbar';
import './App.css';

// pages
import Home from './pages/Home';
// import About from './pages/TopLists';
import TopTracks from './pages/TopTracks';
import TopArtists from './pages/TopArtists';

function App() {
    const [message, setMessage] = useState('');
    const [topData, setTopData] = useState([]);
    const [topArtistData, setTopArtistData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/message')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    const getTopTracks = (time_range, type) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/getTopTracks',
            params: { timeRange: time_range, type: type },
        };
        axios
            .request(options)
            .then((res) => {
                if (res.data.hasOwnProperty('items')) {
                    if (type === 'artists') {
                        setTopArtistData(res.data.items);
                    } else {
                        setTopData(res.data.items);
                    }
                    console.log('DATA: ', res.data.items);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <BrowserRouter>
            <div className="App app-container">
                <Navbar />
                <main class="container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home message={message} />}
                        />
                        <Route
                            path="toptracks"
                            element={
                                <TopTracks
                                    topTracks={topData}
                                    handleClick={getTopTracks}
                                    errorMsg={errorMessage}
                                />
                            }
                        />
                        <Route
                            path="topartists"
                            element={
                                <TopArtists
                                    topArtists={topArtistData}
                                    handleClick={getTopTracks}
                                    errorMsg={errorMessage}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
