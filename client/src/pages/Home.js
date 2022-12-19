export default function Home(props) {
    return (
        <div className="home">
            <h2>Welcome</h2>
            <p>
                <p>{props.message}</p>
            </p>
        </div>
    );
}
