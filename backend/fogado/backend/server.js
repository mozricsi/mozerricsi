const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());
 
 
const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        port: 3307,
        password: "",
        database: "fogado",
    }
)
// a szerver futásának ellenőrzése
app.get("/", (req, res) => {
    res.send("A szerver működik!")
})
 
app.get('/szobak',(req,res) =>{
    db.query('SELECT * FROM szobak', (err, results) =>{
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    })
})
app.get("/szobak-kihasznaltsaga", (req, res) => {
    const sql = `
        SELECT
            szoba,
            COUNT(vendeg) AS vendegek,
            SUM(DATEDIFF(tav, erk)) AS vendegejszakak
        FROM foglalasok
        GROUP BY szoba
        ORDER BY vendegejszakak ASC, vendegek ASC;
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Hiba az adatbázis lekérdezés során!" });
        return res.json(result);
    });
});
 
app.get("/szoba-foglaltsaga/:szobaId", (req, res) => {
    const szobaId = req.params.szobaId;
    const sql = `
        SELECT
            v.vnev AS nev,
            f.erk AS erkezes,
            f.tav AS tavozas
        FROM foglalasok f
        JOIN vendegek v ON f.vendeg = v.vsorsz
        WHERE f.szoba = ?
        ORDER BY v.vnev ASC;
    `;
    db.query(sql, [szobaId], (err, result) => {
        if (err) return res.status(500).json({ error: "Hiba az adatbázis lekérdezés során!" });
        return res.json(result);
    });
});
 
app.listen(3000, () => {
    console.log("A szerver a 3000 porton fut!");
});