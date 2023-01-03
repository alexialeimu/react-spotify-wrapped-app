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

            <button
                onClick={() =>
                    props.handleClick('short_term', 'tracks')
                }
            >
                Get Top 50 (4 weeks)
            </button>
            <button
                onClick={() =>
                    props.handleClick('medium_term', 'tracks')
                }
            >
                Get Top 50 (6 months)
            </button>
            <button
                onClick={() =>
                    props.handleClick('long_term', 'tracks')
                }
            >
                Get Top 50 (1 year)
            </button>

            <div>{props.errorMsg}</div>

            <div class="top-track-list">{tracks}</div>
        </div>
    );
}
