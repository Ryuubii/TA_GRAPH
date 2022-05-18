import * as sqlite3 from 'sqlite3';
let sql;

const db = sqlite3.Database("../test.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
})

//Create Table
sql = `CREATE TABLE network(id INTEGER AUTOINCREMENT PRIMARY KEY, filename, filetype)`
db.run(sql);