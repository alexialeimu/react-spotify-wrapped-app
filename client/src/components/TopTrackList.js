import React from 'react';
import Track from './Track';

export default function TopTrackList(props) {
    const tracks = props.topTracks.map((track, i) => (
        <Track
            key={i}
            number={i}
            track={track.name}
            artists={track.artists}
            album_imgs={track.album.images}
        />
    ));

    return (
        <div>
            <h2>Your Top 50</h2>

            {tracks}

            <button onClick={props.handleClick}>
                Click to get data
            </button>
        </div>
    );
}
