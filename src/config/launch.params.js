const args = process.argv.slice(2); 

// Default values
let configVariables = {
    PORT: 3000,
    HOST: "localhost",

    JWT_EXPIRES_IN: "24h",

    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_LOGIN: "root",
    DB_PASSWD: "",
    DB_NAME: "winget_serv"
}


const helpMessage = `

    \x1b[32m
    ---------------------
    Launch Parameter List
    ---------------------
    \x1b[0m
    --port=<number>
    Change server listening port

    --init=true
    Create all necesary tables

    --token-expires-in=<number>h
    Control the amont of time wich token will be lasting

    --db-host=<string>
    Domain or ip to database

    --db-port=<number>
    Port used to connect to database

    --db-login=<string>
    Username used to connect to database

    --db-passwd=<string>
    Password used to connect to database

    --db-name=<string>
    Desired name for database

    --help
    Display this message

`
args.forEach(arg => {
    const [key, value] = arg.split('=');
    switch (key) {
        case '--host':
            configVariables.HOST = value;
            break;
        case '--port':
            configVariables.PORT = value;
            break;
        case '--init':
            if(value == true){
                const configDB = require('../config/db')
                configDB.initiateDB()
            }
            break;
        case '--token-expires-in':
            configVariables.JWT_EXPIRES_IN = value;
            break;
        case '--db-host':
            configVariables.DB_HOST = value;
            break;
        case '--db-port':
            configVariables.DB_PORT = value;
            break;
        case '--db-login':
            configVariables.DB_LOGIN = value;
            break;
        case '--db-passwd':
            configVariables.DB_PASSWD = value;
            break;
        case '--db-name':
            configVariables.DB_NAME = value;
            break;
        case '--help':
            console.log(helpMessage)
            process.exit() 
            break;
        default:
            if (arg.startsWith('--')) {
                console.log(`Unknown parameter: ${key}`);
            }
    }
});

module.exports = { configVariables }
