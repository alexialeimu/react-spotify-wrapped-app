import React from "react";
import Track from "./Track"

export default function TopTrackList(props) {

    // console.log(props.)
    const tracks = props.topTracks.map((track, i) => <Track key={i} number={i} track={track.name} artists={track.artists} />)

    return (
        <div>
            <h2>Your Top 50</h2>
            
            {tracks}
        </div>
    )
}
