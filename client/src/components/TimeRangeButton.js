import React from 'react';

const TimeRangeButton = ({ code, active, value, handleClick }) => {
    const classes = active ? 'bg-gray-800 text-greenDark' : '';

    return (
        <button
            className={`${classes} p-2`}
            onClick={() => handleClick(code)}
        >
            {value}
        </button>
    );
};

export default TimeRangeButton;
