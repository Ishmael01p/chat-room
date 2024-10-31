// -- SQlite3 DB Example -- //
const express = require("express");
const bodyParser = require('body-parser')
const res = require("express/lib/response")
const app = express();
const sqlite1 = require('sqlite3').verbose();
const url = require('url')
const db = new sqlite1.Database("./test1.db", sqlite1.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

app.use(bodyParser.json());

app.post("/test1", (req, res) => {
    try {
        const { high, low } = req.body;
        sql = "INSERT INTO test1(high, low) VALUES (?,?)";
        db.run(sql, [high, low], (err) => {
            if (err)
                return res.json({ status: 300, success: false, error: err });
            console.log("Successful input", high, low);
        });
        return res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

app.get("/test1", (req, res) => {
    sql = "SELECT * FROM test1";
    try {
        db.all(sql, [], (err, rows) => {
            if (err)
                return res.json({ status: 300, success: false, error: err });

            if (rows.length < 1) 
                return res.json({ status: 300, success: false, error: "No match" });

            return res.json({ status: 200, data: rows, success: true });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

app.listen(3000);