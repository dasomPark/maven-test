import React, { useState, useEffect } from 'react';
import { DropdownDate } from 'react-dropdown-date';
import axios from 'axios';
import './Bearthday.css';

const Bearthday = () => {
    const [date, setDate] = useState(new Date(2020, 3, 22));
    const [iamges, setImages] = useState([]);
    const getImageUrl = (fileName) => {
        return `https://epic.gsfc.nasa.gov/archive/enhanced/${formatDate(date, '/')}/png/${fileName}.png`;
    }

    useEffect(() => {
        axios.get(`https://epic.gsfc.nasa.gov/api/enhanced/date/${formatDate(date)}`)
            .then(({data}) => {
                setImages(data.map(d => d.image));
            })
            .catch(err => {
                console.err(err);
            })
    }, [date]);

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
            <div className="bearthdayImagesContainer">
                {
                    iamges.map((image, idx) => {
                        return (
                            <img key={idx} src={getImageUrl(image)} width="200px" height="auto"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const formatDate = (date, seperator = '-') => {
    let newDate = new Date(date);
    let month = '' + (newDate.getMonth() + 1);
    let day = '' + newDate.getDate();
    let year = newDate.getFullYear();

    if(month.length < 2) month = '0' + month;
    if(day.length < 2) day = '0' + day;

    return [year, month, day].join(seperator)
}

export default Bearthday;