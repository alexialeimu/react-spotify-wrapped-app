import React from 'react';
import Button from './Button';
import Track from './Track';

const TopTrackList = ({ topTrackData, handleClick }) => {
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
        : null;

    return (
        <div className="space-y-8">
            <h3 className="text-left">Top Tracks</h3>

            <div className="flex flex-wrap justify-start gap-y-8 gap-x-4">
                {topTrackData.length > 0
                    ? tracks
                    : 'No tracks to show.'}
            </div>
            {topTrackData.length > 0 && (
                <Button handleClick={handleClick} />
            )}
        </div>
    );
};

export default TopTrackList;
