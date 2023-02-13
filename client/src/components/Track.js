import React from 'react';

const Track = (props) => {
    const artists = props.artists
        .map((artist) => artist.name)
        .join(', ');
    const imageUrl = props.album_imgs[2].url;

    return (
        <div class="track-element">
            <span class="track-number">{props.number + 1}</span>
            <img src={imageUrl} alt="album_cover" />
            <div class="track-main-info">
                <span class="track-info__name">{props.track}</span>
                <span class="track-info__artist">{artists}</span>
            </div>
        </div>
    );
};

export default Track;
