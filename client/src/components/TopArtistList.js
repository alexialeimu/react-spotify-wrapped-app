import React, { useEffect } from 'react';
import Artist from './Artist';

const TopArtistList = ({ topArtistData }) => {
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
        </div>
    );
};

export default TopArtistList;
