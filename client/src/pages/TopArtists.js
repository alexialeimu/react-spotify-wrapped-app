import TopArtistList from '../components/TopArtistList';

export default function TopArtists(props) {
    return (
        <div className="top_artists">
            <h2>Top Artists</h2>
            <p>
                <TopArtistList
                    errorMsg={props.errorMsg}
                    topArtists={props.topArtists}
                    handleClick={props.handleClick}
                />
            </p>
        </div>
    );
}
