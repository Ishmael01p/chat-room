// -- Test SQlite DB -- //
// const sqlite1 = require('sqlite3').verbose();
// const db1 = new sqlite.Database('./test1.db',sqlite.OPEN_READWRITE, (err)=>{
//     if (err) return console.error(err.message);
// });

// const sql2 = `CREATE TABLE test1(ID INTEGER PRIMARY KEY, high, low)`
// db.run(sql)

// -- End of test DB -- //


// -- Start of Stock-Market DB -- // - DataBase has been created!
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./stock-market.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

const sql = `CREATE TABLE IF NOT EXISTS Stocks_Data(
    ID INTEGER PRIMARY KEY,
    date TEXT UNIQUE, 
    open REAL,
    high REAL,
    low REAL,
    close REAL,
    volume INTEGER
)`;
 db.run(sql)


