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
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/message')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    function getTopTracks(time_range) {
        // e.preventDefault();

        const options = {
            method: 'GET',
            url: 'http://localhost:8000/getTopTracks',
            params: { timeRange: time_range },
        };
        axios
            .request(options)
            .then((res) => {
                if (res.data.hasOwnProperty('items')) {
                    setTopData(res.data.items);
                    console.log('DATA: ', res.data.items);
                }
            })
            .catch((err) => {
                console.error(err);
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
