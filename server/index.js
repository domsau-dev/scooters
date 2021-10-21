const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql2')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kolt'
})

con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Yes!');
})

// Iraso nauja posta
// INSERT INTO table_name (column1, column2, column3,...)
// VALUES (value1, value2, value3,...)
app.post('/scooters', (req, res) => {
    console.log(req.body.title)
    const sql = `
        INSERT INTO scooters
        (registration_code, is_busy, last_use_time, total_ride_kilometers)
        VALUES (?, ?, ?, ?)
        `;
    con.query(sql, [req.body.registrationCode, 
        req.body.isBusy, 
        req.body.lastUseTime, 
        req.body.totalRideKilometers], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// Trina posta
// DELETE FROM table_name
// WHERE some_column = some_value
app.delete('/scooters/:id', (req, res) => {
    const sql = `
        DELETE FROM scooters
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

//Redagavimas
// UPDATE table_name
// SET column1=value, column2=value2,...
// WHERE some_column=some_value 
app.put('/scooters/:id', (req, res) => {
    const sql = `
        UPDATE scooters
        SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometers = ?
        WHERE id = ?
        `;
    con.query(sql, [req.body.registrationCode, 
        req.body.isBusy, req.body.lastUseTime, 
        req.body.totalRideKilometers, 
        req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// rodo visus postus
app.get('/scooters', (req, res) => {
    con.query('SELECT * FROM scooters ORDER BY id DESC', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

// skaiciuoka irasus
// SELECT COUNT(ProductID) AS NumberOfProducts FROM Products;
app.get('/scooters/count', (req, res) => {
    con.query('SELECT COUNT(id) AS scooterCount FROM scooters', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.get('/scooters/total_ride', (req, res) => {
    con.query('SELECT SUM(total_ride_kilometers) AS totalRideSum FROM scooters', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})