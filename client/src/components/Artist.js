import React from 'react';

const Artist = ({ artist_imgs, name }) => {
    const imageUrl = artist_imgs[2].url;

    return (
        <div className="">
            <img
                src={imageUrl}
                alt="artist cover"
                className="w-40 h-40 rounded-full"
            />
            <div>
                <p className="text-sm mt-2">{name}</p>
            </div>
        </div>
    );
};

export default Artist;
