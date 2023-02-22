import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopArtistList from './TopArtistList';
import TopTrackList from './TopTrackList';

const Stats = () => {
    const [topTrackData, setTopTrackData] = useState([]);
    const [topArtistData, setTopArtistData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();
        getToplist('medium_term', 'artists', '6');
        getToplist('medium_term', 'tracks', '6');
    }, [userData]);

    const getUserData = () => {
        fetch('http://localhost:8000/stats/user')
            .then((res) => res.json())
            .then((data) => {
                console.log('data: ', data);
                setUserData(data.user);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const getToplist = (time_range, type, amount) => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/stats/top',
            params: {
                timeRange: time_range,
                type: type,
                amount: amount,
            },
        };
        axios
            .request(options)
            .then((res) => {
                if (res.data.hasOwnProperty('items')) {
                    if (type === 'artists') {
                        setTopArtistData(res.data.items);
                    } else {
                        setTopTrackData(res.data.items);
                    }
                    console.log('DATA: ', res.data.items);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="space-y-16">
            <div className="flex items-center">
                {userData && (
                    <div className="order-2 text-start ml-8">
                        <h1>{userData.display_name}</h1>
                        <p>{userData.followers.total} followers</p>
                    </div>
                )}
                {userData && (
                    <img
                        src={userData.images[0].url}
                        alt={userData.display_name}
                        className="order-1 rounded-full w-44"
                    />
                )}
            </div>
            <TopArtistList topArtistData={topArtistData} />
            <TopTrackList topTrackData={topTrackData} />
        </div>
    );
};

export default Stats;
