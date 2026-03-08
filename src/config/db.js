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

module.exports = pool;