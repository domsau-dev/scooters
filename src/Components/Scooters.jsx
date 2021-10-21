import Scooter from "./Scooter"

function Scooters({scooters, editScooter, deleteScooter, fixDate}) {
    return(
        <table className="table table-sm">
            <thead>
                <tr className="table-active">
                    <th>Kodas</th>
                    <th>Užimtumas                 
                    <button type="button" className="btn btn-outline-secondary">Sort</button>
                    </th>
                    <th>Data 
                    <button type="button" className="btn btn-outline-secondary">Sort</button>
                    </th>
                    <th>Rida (km)</th>
                    <th>Atstumas (km)</th>
                    <th>Update/Delete</th>
                </tr>
            </thead>
            <tbody>
                {scooters.map((scooter) =><Scooter key={scooter.id} scooter={scooter} editScooter={editScooter} deleteScooter={deleteScooter} fixDate={fixDate}></Scooter>)}
            </tbody>
        </table>
    );
}

export default Scooters