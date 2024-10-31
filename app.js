// -- Call for any stock avalible on the NASDAQ -- //
// preset = ['AAPL','MICROSOFT','NDVA','AMZN']
// const onstart = async (array) => {
//     array.forEach(item => {
//         fetchDailyTimeSeries(item)
//     });
// }

// const fetchDailyTimeSeries = async (symbol)  => {
//     const apiKey =  'WUGJJHDSGC4E2TRW';
//     const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data['Time Series (Daily)']) {
//             return data['Time Series (Daily)'];
//         } else {
//             console.error("Error fetching data:", data);
//         }
//     } catch (error) {
//         console.error("Fetch error:", error);
//     }
// };

// (async () => {
//     const data = await fetchDailyTimeSeries('AAPL');
//     console.log(data);  // This will log the actual stock data if the API call succeeds
// })();

// -- SQlite3 DB -- //
const express = require("express");
const bodyParser = require('body-parser')
const res = require("express/lib/response")
const app = express();
const sqlite = require('sqlite3').verbose();
const url = require('url')
const db = new sqlite.Database("./test1.db", sqlite.OPEN_READWRITE, (err) => {
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
        const queryObject = url.parse(req.url, true).query;
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
