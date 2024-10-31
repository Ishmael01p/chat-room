const express = require("express");
const bodyParser = require('body-parser');
const res = require("express/lib/response")
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const apiKey = process.env.API_KEY;
const app = express();
const url = require('url')
const db = new sqlite3.Database("./STOCK.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

app.use(bodyParser.json());

// -- Just retrieve data does not access db -- //

// const fetchIntradayTimeSeries = async (symbol, time)  => {
//     const apiKey =  'WUGJJHDSGC4E2TRW';
//     // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=30min&apikey=${apiKey}`;
//     const url2 = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=z${time}&apikey=${apiKey}`;

//     try {
//         const response = await fetch(url2);
//         const data = await response.json();
//         const timeSeriesKey = `Time Series (${time})`;
//         if (data[timeSeriesKey]) {
//             return data[timeSeriesKey];
//         } else {
//             console.error("Error fetching data:", data);
//         }
//     } catch (error) {
//         console.error("Fetch error:", error);
//     }
// };

// (async () => {
//     const data = await fetchIntradayTimeSeries('SPY', '30min');
//     console.log(data);  // This will log the actual stock data if the API call succeeds
// })();

// -- Access to DB -- //


const getDateRange = (days) => {
    const toDate = new Date();
    const fromDate = new Date(toDate);
    fromDate.setDate(fromDate.getDate() - days);

    return {
        from: fromDate.toISOString().split("T")[0],
        to: toDate.toISOString().split("T")[0]
    };
};

app.post("/fetch-and-save", async (req, res) => {
    const { symbol, multiplier, timespan } = req.body;

    if (!symbol || !multiplier || !timespan) {
        return res.json({
            status: 400,
            success: false,
            error: "Symbol, multiplier, and timespan are required."
        });
    }

    // Create the new table with 'symbol' if it does not exist
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS STOCKS (
            ID INTEGER PRIMARY KEY,
            symbol TEXT,
            date TEXT UNIQUE,
            open REAL,
            high REAL,
            low REAL,
            close REAL,
            volume INTEGER
        )
    `;
    db.run(createTableSQL, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
            return res.json({
                status: 500,
                success: false,
                error: "Failed to create new table."
            });
        }
    });

    // Set the date range for the last 10 days
    const { from, to } = getDateRange(10);
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&apiKey=${apiKey}`;
    console.log("Fetching data from URL:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const records = data.results.map((record) => ({
                date: new Date(record.t).toISOString(),
                open: record.o,
                high: record.h,
                low: record.l,
                close: record.c,
                volume: record.v
            }));

            // Insert data into the new table, including 'symbol'
            const sql = `INSERT OR IGNORE INTO STOCKS (symbol, date, open, high, low, close, volume) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            records.forEach((record) => {
                db.run(sql, [symbol, record.date, record.open, record.high, record.low, record.close, record.volume], (err) => {
                    if (err) {
                        console.error("Data insertion error:", err.message);
                    }
                });
            });
            console.log("Data successfully inserted into the new table");
            return res.json({ status: 200, success: true, data: records });
        } else {
            console.error("Error fetching data:", data);
            return res.json({ status: 500, success: false, error: "Failed to fetch data from API." });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return res.json({
            status: 500,
            success: false,
            error: "Error occurred during data fetching or insertion."
        });
    }
});

app.get("/get-stock", (req, res) => {
    const symbol = req.query.symbol;

    if (!symbol) {
        return res.json({
            status: 400,
            success: false,
            error: "Stock symbol is required."
        });
    }

    const sql = `SELECT * FROM STOCKS WHERE symbol = ?`;
    db.all(sql, [symbol], (err, rows) => {
        if (err) {
            console.error("Database query error:", err.message);
            return res.json({
                status: 500,
                success: false,
                error: "Failed to fetch stock data."
            });
        }

        if (rows.length === 0) {
            return res.json({
                status: 404,
                success: false,
                message: "No data found for the specified stock symbol."
            });
        }

        console.log("Data successfully retrieved from the table");
        return res.json({
            status: 200,
            success: true,
            data: rows
        });
        
    });
});



app.listen(3000)