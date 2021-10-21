import { useEffect, useState } from "react";

function Scooter({scooter, editScooter, deleteScooter, fixDate}) {

    const [checked, setChecked] = useState(scooter.is_busy === 0 ? false : true)
    const [checkedInfo, setCheckedInfo] = useState("");

    useEffect(() => {
        setCheckedInfo(scooter.is_busy === 0 ? "Laisvas" : "Užimtas")
      }, [scooter])

      const handleChange = (e) => {
          e.target.checked ? setCheckedInfo("Užimtas") : setCheckedInfo("Laisvas");
      }

    return(<tr className="table-info">
        <td>{scooter.registration_code}</td>
        <td>{checkedInfo}  
        <input type="checkbox" defaultChecked={checked} onChange={(e) => handleChange(e)}/>
        </td>
        <td><input type="date" value={fixDate(scooter.last_use_time)}/></td>
        <td>{scooter.total_ride_kilometers}</td>
        <td>
            <form action="">
                <input type="number" min="0" max="999" step="0.1"/>
            </form>
        </td>
        <td>In progress</td>
        </tr>
    );
}

export default Scooter