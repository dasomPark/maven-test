import React, { useState, useEffect } from 'react';
import { DropdownDate } from 'react-dropdown-date';
import axios from 'axios';
import './Bearthday.css';

const Bearthday = () => {
    const [date, setDate] = useState(new Date(2020, 3, 22));
    const [lastBirthday, setLastBirthday] = useState(null);
    const [iamges, setImages] = useState([]);
    
    const getImageUrl = (fileName) => {
        return `https://epic.gsfc.nasa.gov/archive/enhanced/${formatDate(lastBirthday, '/')}/png/${fileName}.png`;
    }

    useEffect(() => {
        if (lastBirthday === null) return;
        axios.get(`https://epic.gsfc.nasa.gov/api/enhanced/date/${formatDate(lastBirthday)}`)
            .then(({data}) => {
                if(data.length === 0) {
                    let newDate = new Date(lastBirthday);
                    newDate.setDate(newDate.getDate() + 1);
                    setLastBirthday(getLastBirthday(newDate));
                } else {
                    setImages(data.map(d => d.image));
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [lastBirthday]);

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
                <button className="bearthdayButton" onClick={() => {
                    setLastBirthday(getLastBirthday(date));
                }}>Submit</button>
            </div>
            <div className="bearthdayImagesContainer">
                {
                    iamges.map((image, idx) => {
                        return (
                            <img className="bearthdayImage" key={idx} src={getImageUrl(image)}/>
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

    return [year, month, day].join(seperator);
}

const getLastBirthday = (date) => {
    let today = new Date();
    let newDate = new Date(date);
    newDate.setFullYear(today.getFullYear());

    if(today.getTime() < newDate.getTime()) {
        newDate.setFullYear(today.getFullYear() - 1);
    }

    return newDate;
}

export default Bearthday;
