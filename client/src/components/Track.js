import React from 'react';

const Track = (props) => {
    // const artists = props.artists
    //     .map((artist) => artist.name)
    //     .join(', ');
    const imageUrl = props.album_imgs[0].url;

    return (
        <div className="basis-40">
            <img
                src={imageUrl}
                alt="album_cover"
                className="w-40 h-40"
            />
            <div>
                <p className="text-sm mt-2">{props.track}</p>
            </div>
        </div>
    );
};

export default Track;
