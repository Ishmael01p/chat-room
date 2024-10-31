const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./test1.db',sqlite.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
});


const sql = `CREATE TABLE test1(ID INTEGER PRIMARY KEY, high, low)`
db.run(sql)