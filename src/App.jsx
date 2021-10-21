import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import Scooters from './Components/Scooters';
import Statistics from "./Components/Statistics";
import NewScooter from "./Components/NewScooter";

function App() {

  const [scooters, setScooters] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [scooterCount, setScooterCount] = useState(0);
  const [rideSum, setRideSum] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
      .then((response) => {
        setScooters(response.data);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/scooters/count')
      .then((response) => {
        setScooterCount(response.data[0].scooterCount);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/scooters/total_ride')
      .then((response) => {
        setRideSum(response.data[0].totalRideSum);
      })
  }, [lastUpdate])

  const addScooter = (scooter) => {
    axios.post('http://localhost:3003/scooters', scooter)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const editScooter = (id, scooter) => {
    axios.put('http://localhost:3003/scooters/' + id, scooter)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const deleteScooter = (id) => {
    axios.delete('http://localhost:3003/scooters/' + id)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const getScooter = id => {
    if (id === 0) {
      return {
        registration_code: '',
        is_busy: '',
        last_use_time: '',
        total_ride_kilometers: ''
      };
    }
    for (let i = 0; i < scooters.length; i++) {
      if (scooters[i].id === id) {
        return { ...scooters[i] };
      }
    }
  }


  const fixDate = (d) => {
    d = new Date(d)
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return (`${year}-${month}-${day}`)
  }

  // const sort = by => {
  //   const booksCopy = books.slice();
  //   if ('title' === by) {
  //     booksCopy.sort((a, b) => {
  //       if (a.title > b.title) {
  //         return 1;
  //       }
  //       if (a.title < b.title) {
  //         return -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   if ('pages' === by) {
  //     booksCopy.sort((a, b) => a.pages - b.pages);
  //   }
  //   setBooks(booksCopy);
  // }


  return (
    <>
      <Statistics rideSum={rideSum} scooterCount={scooterCount}></Statistics>
      <NewScooter addScooter={addScooter}></NewScooter>
      <Scooters scooters={scooters} editScooter={editScooter} deleteScooter={deleteScooter} fixDate={fixDate}></Scooters>
    </>
  );
}

export default App;