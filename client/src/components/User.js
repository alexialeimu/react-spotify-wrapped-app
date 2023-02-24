const User = ({ userData }) => {
    return (
        <div>
            {userData ? (
                <div className="flex items-center">
                    <div className="order-2 text-start ml-8">
                        <h1>{userData.display_name}</h1>
                        <p className="text-sm font-bold text-gray-400">
                            {userData.followers.total} followers
                        </p>
                    </div>
                    <img
                        src={userData.images[0].url}
                        alt={userData.display_name}
                        className="order-1 rounded-full w-44"
                    />
                </div>
            ) : (
                'No data to show. Please sign in.'
            )}
        </div>
    );
};

export default User;
