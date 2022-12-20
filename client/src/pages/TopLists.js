import TopTrackList from '../components/TopTrackList';

export default function TopLists(props) {
    return (
        <div className="top_lists">
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
