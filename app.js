require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const launchParams = require('./src/config/launch.params').configVariables
const configDB = require('./src/config/db')
const scriptRoute = require('./src/routes/scripts.route')
const userRoute = require('./src/routes/user.route')

// runned here to prevent circular dependency
if (launchParams.INIT_DB == true) {
    configDB.initiateDB().then(() => {
        console.log("Exiting after database initialization.");
        process.exit(0);
    });
}

app.use("/user", userRoute)
app.use("/script", scriptRoute)

configDB.testDBConnection()

app.listen(launchParams.PORT, () => {
    console.log(`
        Server is listening at http://${launchParams.HOST}:${launchParams.PORT}
        
        `)
    }
)