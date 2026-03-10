const mysql = require("mysql2/promise")
const configVariables = require("../config/launch.params").configVariables

const pool = mysql.createPool({
    host: configVariables.host,
    port: configVariables.port,
    user: configVariables.db_login,
    password: configVariables.db_passwd,
    database: configVariables.db_name
})

const testDBConnection = async () => {
    try{
        const [solution] = await pool.query("SELECT 1 + 1 AS solution",)
        console.log("\x1b[32mDatabase is connected\x1b[0m")
    } catch (err) {
        console.log("\x1b[31mDatabase isn't connected\x1b[0m")
    }
}

const initiateDB = async () => {
    try{
        pool.query(`
            CREATE DATABASE IF NOT EXISTS ${db_name}
            CREATE TABLE IF NOT EXISTS user(
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            hashed_password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            role_id INT NOT NULL DEFAULT 2,
            FOREIGN KEY (role_id) REFERENCES roles(id)
            )

            CREATE TABLE IF NOT EXISTS roles(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL 
            )

            CREATE TABLE IF NOT EXISTS script(
            id INT PRIMARY KEY AUTO_INCREMENT,
            public_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            content JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            user_id INT NOT NULL UNIQUE,
            FOREIGN KEY (user_id) REFERENCES user(id)
            )
            `)
    } catch(err){
        next(err)
        console.log("\x1b[31mThere were a problem creating the DATABASE structure\x1b[0m" + "\n" + err)
    }
}

module.exports = { pool, testDBConnection, initiateDB };