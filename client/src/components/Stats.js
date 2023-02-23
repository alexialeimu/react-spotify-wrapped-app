import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopArtistList from './TopArtistList';
import TopTrackList from './TopTrackList';
import TimeRangeButtons from './TimeRangeButtons';
import RecentlyPlayedList from './RecentlyPlayedList';

const Stats = () => {
    const [topTrackData, setTopTrackData] = useState([
        { name: 'short_term', content: [] },
        { name: 'medium_term', content: [] },
        { name: 'long_term', content: [] },
    ]);
    const [topArtistData, setTopArtistData] = useState([
        { name: 'short_term', content: [] },
        { name: 'medium_term', content: [] },
        { name: 'long_term', content: [] },
    ]);
    const [userData, setUserData] = useState(null);
    const [timeRange, setTimeRange] = useState('medium_term');
    const [topArtistListLength, setTopArtistListLength] = useState(6);
    const [topTrackListLength, setTopTrackListLength] = useState(6);

    useEffect(() => {
        getUserData();
        getToplist('medium_term', 'artists', topArtistListLength);
        getToplist('medium_term', 'tracks', topTrackListLength);
    }, []);

    useEffect(() => {
        getToplist(timeRange, 'artists', topArtistListLength);
        getToplist(timeRange, 'tracks', topTrackListLength);
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
                    const newObject = {
                        name: time_range,
                        content: res.data.items,
                    };
                    // console.log('newObject: ', newObject);

                    if (type === 'artists') {
                        setTopArtistData(
                            topArtistData.map((item) => {
                                if (item.name === newObject.name) {
                                    return {
                                        ...item,
                                        content: newObject.content,
                                    };
                                } else return item;
                            })
                        );
                    } else {
                        setTopTrackData(
                            topTrackData.map((item) => {
                                if (item.name === newObject.name) {
                                    return {
                                        ...item,
                                        content: newObject.content,
                                    };
                                } else return item;
                            })
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

    const showMore = (type) => {
        if (type === 'artists') {
            setTopArtistListLength(24);
            getToplist(timeRange, type, 24);
        } else {
            setTopTrackListLength(24);
            getToplist(timeRange, type, 24);
        }
    };

    return (
        <div className="space-y-16">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {userData && (
                        <div className="order-2 text-start ml-8">
                            <h1>{userData.display_name}</h1>
                            <p className="text-sm font-bold text-gray-400">
                                {userData.followers.total} followers
                            </p>
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
                <TimeRangeButtons
                    defaultButton={timeRange}
                    handleClick={changeTimeRange}
                />
            </div>
            <div className="space-y-16">
                <TopArtistList
                    topArtistData={
                        topArtistData.filter(
                            (x) => x.name === timeRange
                        ).length > 0 &&
                        topArtistData.filter(
                            (x) => x.name === timeRange
                        )[0].content
                    }
                    handleClick={() => showMore('artists')}
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
                    handleClick={() => showMore('tracks')}
                />
                <RecentlyPlayedList />
            </div>
        </div>
    );
};

export default Stats;
