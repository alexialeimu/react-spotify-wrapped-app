export default function Home({ user, message }) {
    return (
        <div className="home">
            <h2>Welcome {user ? user.display_name : ''}!</h2>
            <p>{message}</p>
        </div>
    );
}
