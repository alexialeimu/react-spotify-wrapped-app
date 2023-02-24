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
                    setRecentlyPlayedData(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getRecentlyPlayed();
    }, []);

    return (
        <div className="space-y-8 text-left">
            <h3>Recently Played</h3>
            <div>
                {recentlyPlayedData
                    ? recentlyPlayedData.items.map((track, i) => (
                          <RecentlyPlayedTrack
                              key={i}
                              trackData={track}
                          />
                      ))
                    : 'No data to show'}
            </div>
        </div>
    );
};

export default RecentlyPlayedList;
