import React, { useEffect, useState } from 'react';

const HoursLine = ({ excludedHours }) => {
    const [hoursSec, setHoursSec] = useState([]);

    useEffect(() => {
        generateHalfHours();
    }, [excludedHours]);

    const generateHalfHours = () => {
        const elements = [];
        for (let i = 0; i < 48; i++) {
            const isExcluded = excludedHours.includes(i);
            elements.push(
                <div key={i} className={isExcluded ? 'halfHourElement busy' : 'halfHourElement'} />
            );
        }
        setHoursSec(elements);
    };

    return (
        <div className='hours-sec admin-hours-sec'>
            {hoursSec}
        </div>
    );
};

export default HoursLine;
