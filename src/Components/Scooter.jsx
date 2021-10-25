import { useEffect, useState } from "react";

function Scooter({scooter, editScooter, deleteScooter, fixDate}) {

    const [checked, setChecked] = useState(scooter.is_busy === 0 ? false : true);
    const [checkedInfo, setCheckedInfo] = useState("");
    const [date, setDate] = useState(fixDate(scooter.last_use_time));
    const [ride, setRide] = useState(0);

    useEffect(() => {
        setCheckedInfo(scooter.is_busy === 0 ? "Laisvas" : "Užimtas")
      }, [scooter])

      const handleChange = (e) => {
          e.target.checked ? setCheckedInfo("Užimtas") : setCheckedInfo("Laisvas");
      }

      const handleDate = (e) => {
        setDate(fixDate(e.target.value))
    }

    const handleRide = (e) => {
        setRide(e.target.value);
    }

    const edit = () => {
        editScooter(scooter.id, {
            registrationCode: scooter.registration_code,
            isBusy: checkedInfo === "Laisvas" ? 0 : 1,
            lastUseTime: fixDate(date),
            totalRideKilometers: Number(scooter.total_ride_kilometers) + Number(ride)
        })
        setRide(0);

    }
    return(<tr className="table-info">
        <td>{scooter.registration_code}</td>
        <td>{checkedInfo}  
        <input type="checkbox" defaultChecked={checked} onChange={(e) => handleChange(e)}/>
        </td>
        <td><input type="date" value={date} onChange={(e) => handleDate(e)}/></td>
        <td>{scooter.total_ride_kilometers}</td>
        <td>
            <form action="">
                <input type="number" min="0" max="999" step="0.1" value={ride} onChange={(e) => handleRide(e)}/>
            </form>
        </td>
        <td>
            <button className="btn btn-success" onClick={() => edit()}>Edit</button>
            <button className="btn btn-danger" onClick={() => deleteScooter(scooter.id)}>Delete</button>
        </td>
        </tr>
        
    );
}

export default Scooter