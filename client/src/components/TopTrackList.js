import React from 'react';
import Track from './Track';

const TopTrackList = ({ topTrackData }) => {
    const tracks = topTrackData
        ? topTrackData.map((track, i) => (
              <Track
                  key={i}
                  number={i}
                  track={track.name}
                  artists={track.artists}
                  album_imgs={track.album.images}
              />
          ))
        : '';

    return (
        <div className="space-y-8">
            <h3 className="text-left">Top Tracks</h3>

            <div className="flex flex-wrap justify-around gap-y-8 gap-x-4">
                {tracks}
            </div>
        </div>
    );
};

export default TopTrackList;
