import React from 'react';
import Artist from './Artist';

const TopArtistList = (props) => {
    console.log('artist list: ', props.topArtists);

    const artists = props.topArtists
        ? props.topArtists.map((artist, i) => (
              <Artist
                  key={i}
                  number={i}
                  name={artist.name}
                  artist_imgs={artist.images}
              />
          ))
        : '';

    return (
        <div>
            <h2>Your Top 50 Artists</h2>

            <button
                onClick={() =>
                    props.handleClick('short_term', 'artists')
                }
            >
                Get Top 50 (4 weeks)
            </button>
            <button
                onClick={() =>
                    props.handleClick('medium_term', 'artists')
                }
            >
                Get Top 50 (6 months)
            </button>
            <button
                onClick={() =>
                    props.handleClick('long_term', 'artists')
                }
            >
                Get Top 50 (1 year)
            </button>

            <div>{props.errorMsg}</div>

            <div class="top-track-list">{artists}</div>
        </div>
    );
};

export default TopArtistList;
