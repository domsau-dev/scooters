import { useEffect, useState } from "react";

function NewScooter({addScooter, fixDate}) {

    const [regNum, setRegNum] = useState('');
    const [ride, setRide] = useState(0);
    const [date, setDate] = useState(Date.now());

    
    const control = (e, what) => {
        switch (what) {
            case 'regNum':
                setRegNum(e.target.value);
                break;
            case 'ride':
                setRide(e.target.value);
                break;
            case 'date':
                setDate(e.target.value);
                break;
        }
    }

    
    const insert = () => {
        if (ride > 999 || ride < 0) {
            window.alert("Rida turi būti tarp 0 ir 999")
            return;
        }
        addScooter({
             registrationCode: regNum,
             isBusy: 0,
             lastUseTime: fixDate(date),
             totalRideKilometers: ride
         });
         setRegNum('');
         setRide(0);
         setDate(Date.now());
     }
 

    return(
        <div className="container">
            <h2>Naujo paspirtuko kūrimas</h2>
            <div>Registracijos kodas: <input type="text" maxLength="8" size="9" onChange={(e) => control(e, "regNum")} value={regNum}/></div>
            <div>Data: <input type="date" onChange={(e) => control(e, "date")} value={date}/></div>
            <div>Rida <input type="number" min="0" max="999" size="10" onChange={(e) => control(e, "ride")} value={ride}/></div>
            <button type="button" className="btn btn-outline-secondary" onClick={insert}>Kurti</button>
        </div>
    );
}

export default NewScooter