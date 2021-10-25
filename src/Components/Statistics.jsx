function Statistics({rideSum, scooterCount}) {
    return(<div className="container">
        <h2>Statistika:</h2>
        <div>Paspirtukų kiekis: {scooterCount}</div>
        <div>Visų ridų suma: {rideSum}</div>
    </div>
    );
}

export default Statistics