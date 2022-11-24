import React from "react";

export default function Track(props) {

    const artists = props.artists.map(artist => artist.name).join(", ")

    return (
        <div>
            <p>{props.number+1}. {artists} – {props.track}</p>
        </div>
    )
}
