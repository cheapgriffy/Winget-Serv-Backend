const mysql = require("mysql2/promise")

const db_domain = process.env.db_domain || localhost
const db_login = process.env.db_login || localhost
const db_passwd = process.env.db_passwd || ""
const db_name = process.env.db_name


const pool = mysql.createPool({
    host: db_domain,
    user: db_login,
    password: "",
    database: "winget_serv"
})

const testDBConnection = async () => {
    try{
        const [solution] = await pool.query("SELECT 1 + 1 AS solution",)
        console.log("\x1b[32mDatabase is connected\x1b[0m")
    } catch (err) {
        console.log("\x1b[31mDatabase isn't connected\x1b[0m")
    }
}

module.exports = { pool, testDBConnection };