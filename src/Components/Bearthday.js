import React, { useState } from 'react';
import './Bearthday.css';
import { DropdownDate } from 'react-dropdown-date';

const Bearthday = () => {
    const [date, setDate] = useState(new Date(2020, 3, 22));

    return (
        <div className="bearthdayContainer">
            <div className="bearthdaySelectContainer">
                <h1>Select your Birthday</h1>
                <DropdownDate
                    selectedDate={date}
                    onDateChange={(newDate) => {
                        setDate(newDate);
                    }}
                    options={{ yearReverse: true }}
                    classes={{
                        dateContainer: 'DropdownDateContainer',
                        year: 'DropdownDateSelect',
                        month: 'DropdownDateSelect',
                        day: 'DropdownDateSelect'
                    }}
                    defaultValues={{
                        year: 'year',
                        month: 'month',
                        day: 'day'
                    }}
                />
                <button className="bearthdayButton">Submit</button>
            </div>
        </div>
    )
}

export default Bearthday;