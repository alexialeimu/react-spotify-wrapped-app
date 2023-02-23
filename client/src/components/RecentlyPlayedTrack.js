import moment from 'moment';
moment().format();

const RecentlyPlayedTrack = ({ trackData }) => {
    const artists = trackData.track.artists
        .map((artist) => artist.name)
        .join(', ')
        .toString();

    const moment1 = moment(trackData.played_at)
        .startOf('minutes')
        .fromNow();

    const albumImageURL = trackData.track.album.images[2].url;
    const albumName = trackData.track.album.name;

    return (
        <div className="py-2 flex flex-row items-center justify-between">
            <div className="flex gap-x-4">
                <img
                    src={albumImageURL}
                    alt={albumName}
                    className="h-12"
                />
                <div className="flex flex-col">
                    <div className="font-bold">
                        {trackData.track.name}
                    </div>
                    <div className="text-sm">{artists}</div>
                </div>
            </div>
            <div className="text-sm font-bold text-gray-400">
                {moment1}
            </div>
        </div>
    );
};

export default RecentlyPlayedTrack;
