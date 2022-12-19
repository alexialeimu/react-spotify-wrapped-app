import React from 'react';

export default function Track(props) {
    const artists = props.artists
        .map((artist) => artist.name)
        .join(', ');
    const imageUrl = props.album_imgs[2].url;

    return (
        <div>
            <p>
                {props.number + 1}. {artists} – {props.track}
            </p>
            <img src={imageUrl} alt="album_cover" />
        </div>
    );
}
