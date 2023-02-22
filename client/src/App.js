import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stats from './components/Stats';
import './App.css';

// pages
import Home from './pages/Home';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/message')
            .then((res) => res.json())
            .then((data) => {
                console.log('data: ', data);
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <BrowserRouter>
            <div className="App app-container">
                <Navbar />
                <main className="mt-16">
                    <div className="layout">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home message={message} />}
                            />
                            <Route
                                path="/stats"
                                element={<Stats />}
                            />
                        </Routes>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
