import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopArtistList from './TopArtistList';
import TopTrackList from './TopTrackList';
import TimeRangeButtons from './TimeRangeButtons';
import RecentlyPlayedList from './RecentlyPlayedList';
import User from './User';

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

    // get user data + artist top list + track top list when first rendered
    useEffect(() => {
        getUserData();
        getToplist('medium_term', 'artists', topArtistListLength);
        getToplist('medium_term', 'tracks', topTrackListLength);
    }, []);

    // fetch data again when timeRange is changed
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
                    console.log('newObject: ', newObject);

                    // define which state is updated (artist or track)
                    const data =
                        type === 'artists'
                            ? topArtistData
                            : topTrackData;
                    const changeData =
                        type === 'artists'
                            ? setTopArtistData
                            : setTopTrackData;

                    changeData(
                        data.map((item) => {
                            if (item.name === newObject.name) {
                                return {
                                    ...item,
                                    content: newObject.content,
                                };
                            } else return item;
                        })
                    );
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
        } else {
            setTopTrackListLength(24);
        }
        getToplist(timeRange, type, 24);
    };

    return (
        <div className="space-y-16">
            <div className="flex items-center justify-between">
                <User userData={userData} />
                <TimeRangeButtons
                    defaultButton={timeRange}
                    handleClick={changeTimeRange}
                />
            </div>
            <div className="space-y-16">
                <TopArtistList
                    topArtistData={
                        topArtistData.find(
                            (x) => x.name === timeRange
                        ).content
                    }
                    handleClick={() => showMore('artists')}
                />
                <TopTrackList
                    topTrackData={
                        topTrackData.find((x) => x.name === timeRange)
                            .content
                    }
                    handleClick={() => showMore('tracks')}
                />
                <RecentlyPlayedList />
            </div>
        </div>
    );
};

export default Stats;
