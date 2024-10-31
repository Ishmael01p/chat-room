const express = require("express");
const bodyParser = require('body-parser');
const res = require("express/lib/response")
const sqlite3 = require('sqlite3').verbose();
// const fetch = require('node-fetch');
const app = express();
const url = require('url')
const db = new sqlite3.Database("./stock-market.db", sqlite3.OPEN_READWRITE, (err) => {
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

const apiKey = "DYgHgzOOE35mbPGZlwvUf3m6M1FWhq90";

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

    const { from, to } = getDateRange(10); // Past 10 days
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

            const sql = `INSERT INTO Stocks_Data (date, open, high, low, close, volume) VALUES (?, ?, ?, ?, ?, ?)`;

            records.forEach((record) => {
                db.run(sql, [record.date, record.open, record.high, record.low, record.close, record.volume], (err) => {
                    if (err) {
                        console.error("Data insertion error:", err.message);
                    }
                });
            });
            console.log("Data successfully inserted into the DB");
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

app.listen(3000)