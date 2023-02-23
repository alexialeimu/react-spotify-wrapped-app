import React, { useEffect, useState } from 'react';
import Artist from './Artist';
import Button from './Button';

const TopArtistList = ({ topArtistData, handleClick }) => {
    const artists = topArtistData
        ? topArtistData.map((artist, i) => (
              <Artist
                  key={i}
                  number={i}
                  name={artist.name}
                  artist_imgs={artist.images}
              />
          ))
        : '';

    return (
        <div className="space-y-8">
            <h3 className="text-left">Top Artists</h3>

            <div className="flex flex-wrap justify-around gap-y-8 gap-x-4">
                {artists}
            </div>

            <Button handleClick={handleClick} />
        </div>
    );
};

export default TopArtistList;
