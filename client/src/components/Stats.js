import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopArtistList from './TopArtistList';
import TopTrackList from './TopTrackList';
import TimeRangeButtons from './TimeRangeButtons';

const Stats = () => {
    const [topTrackData, setTopTrackData] = useState([]);
    const [topArtistData, setTopArtistData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [timeRange, setTimeRange] = useState('medium_term');

    let topListLength = 6;

    useEffect(() => {
        getUserData();
        getToplist('medium_term', 'artists', topListLength);
        getToplist('medium_term', 'tracks', topListLength);
    }, []);

    useEffect(() => {
        if (
            topTrackData.filter((e) => e.name === timeRange)
                .length === 0 &&
            topArtistData.filter((e) => e.name === timeRange)
                .length === 0
        ) {
            getToplist(timeRange, 'artists', topListLength);
            getToplist(timeRange, 'tracks', topListLength);
        }
    }, [timeRange]);

    const getUserData = () => {
        fetch('http://localhost:8000/user')
            .then((res) => res.json())
            .then((data) => {
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
                        // setTopArtistData(res.data.items);
                        const newArtistObject = {
                            name: time_range,
                            content: res.data.items,
                        };
                        setTopArtistData(
                            topArtistData.concat(newArtistObject)
                        );
                    } else {
                        // setTopTrackData(res.data.items);
                        const newTrackObject = {
                            name: time_range,
                            content: res.data.items,
                        };
                        setTopTrackData(
                            topTrackData.concat(newTrackObject)
                        );
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const changeTimeRange = (time_range) => {
        setTimeRange(time_range);
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
            <div className="space-y-16">
                <TimeRangeButtons
                    activeButton={timeRange}
                    handleClick={changeTimeRange}
                />
                <TopArtistList
                    topArtistData={
                        topArtistData.filter(
                            (x) => x.name === timeRange
                        ).length > 0 &&
                        topArtistData.filter(
                            (x) => x.name === timeRange
                        )[0].content
                    }
                />
                <TopTrackList
                    topTrackData={
                        topTrackData.filter(
                            (x) => x.name === timeRange
                        ).length > 0 &&
                        topTrackData.filter(
                            (x) => x.name === timeRange
                        )[0].content
                    }
                />
            </div>
        </div>
    );
};

export default Stats;
