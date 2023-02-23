const Button = ({ handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="bg-gray-800 border-2 text-greenDark border-greenDark/50 radius-full rounded-full py-3 px-6 font-bold"
        >
            Show more
        </button>
    );
};

export default Button;
