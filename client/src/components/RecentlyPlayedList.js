import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecentlyPlayedTrack from './RecentlyPlayedTrack';

const RecentlyPlayedList = () => {
    const [recentlyPlayedData, setRecentlyPlayedData] = useState();
    useEffect(() => {
        const getRecentlyPlayed = () => {
            axios
                .get('http://localhost:8000/stats/recently-played')
                .then((res) => {
                    console.log(res.data);
                    setRecentlyPlayedData(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getRecentlyPlayed();
    }, []);

    // recentlyPlayedData && console.log(recentlyPlayedData.items);

    return (
        <div className="space-y-8 text-left">
            <h3>Recently Played</h3>
            <div>
                {recentlyPlayedData &&
                    recentlyPlayedData.items.map((track) => (
                        <RecentlyPlayedTrack trackData={track} />
                    ))}
                {/* <RecentlyPlayedTrack /> */}
                {/* <p>{JSON.stringify(recentlyPlayedData)}</p> */}
            </div>
        </div>
    );
};

export default RecentlyPlayedList;
