import React, { useEffect, useState } from 'react';

const HoursLine = ({ excludedHours }) => {
    const [hoursSec, setHoursSec] = useState([]);

    useEffect(() => {
        if (excludedHours) {
            generateHalfHours(excludedHours);
        }
        else {
            generateHalfHours([])
        }
    }, [excludedHours]);

    const generateHalfHours = (excludedHourss) => {
        const elements = [];
        for (let i = 0; i < 48; i++) {
            const isExcluded = excludedHourss.includes(i);
            if (isExcluded) {
                elements.push(
                    <div key={i} className='halfHourElement busy'/>
                );  
            }
            else if (i < 13 || i > 44){
                elements.push(
                    <div key={i} className='halfHourElement inactive' />
                );
            }
            else {
                elements.push(
                    <div key={i} className='halfHourElement' />
                );
            }
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
