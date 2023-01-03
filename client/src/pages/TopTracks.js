import TopTrackList from '../components/TopTrackList';

export default function TopTracks(props) {
    return (
        <div className="top_tracks">
            <h2>Top Lists</h2>
            <p>
                <TopTrackList
                    errorMsg={props.errorMsg}
                    topTracks={props.topTracks}
                    handleClick={props.handleClick}
                />
            </p>
        </div>
    );
}
