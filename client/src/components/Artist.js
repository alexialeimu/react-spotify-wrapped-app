import React from 'react';

const Artist = (props) => {
    const imageUrl = props.artist_imgs[2].url;

    return (
        <div class="track-element">
            <span class="track-number">{props.number + 1}</span>
            <img src={imageUrl} alt="album_cover" />
            <div class="track-main-info">
                <span class="track-info__name">{props.track}</span>
                <span class="track-info__artist">{props.name}</span>
            </div>
        </div>
    );
};

export default Artist;
