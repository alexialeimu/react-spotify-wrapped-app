import React, { useEffect, useState } from 'react';
import TimeRangeButton from './TimeRangeButton';

const TimeRangeButtons = ({ handleClick }) => {
    const [activeButton, setActiveButton] = useState('medium_term');
    const timeRanges = [
        { code: 'short_term', value: '4 weeks' },
        { code: 'medium_term', value: '6 months' },
        { code: 'long_term', value: 'Lifetime' },
    ];

    const toggleTimeRange = (code) => {
        setActiveButton(code);
        handleClick(code);
    };

    return (
        <div className="w-fit bg-darkColor p-2 rounded-xl space-x-2 text-sm font-bold">
            {timeRanges.map((timeRange, i) => {
                return (
                    <TimeRangeButton
                        key={i}
                        code={timeRange.code}
                        active={
                            activeButton === timeRange.code
                                ? true
                                : false
                        }
                        value={timeRange.value}
                        handleClick={toggleTimeRange}
                    />
                );
            })}
        </div>
    );
};

export default TimeRangeButtons;
