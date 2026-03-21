require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())

const launchParams = require('./src/config/launch.params').configVariables
const configDB = require('./src/config/db')
const scriptRoute = require('./src/routes/scripts.route')
const userRoute = require('./src/routes/user.route')
const healthRoute = require("./src/routes/health.route")

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())

// runned here to prevent circular dependency
if (launchParams.INIT_DB == true) {
    configDB.initiateDB().then(() => {
        console.log("Exiting after database initialization.");
        process.exit(0);
    });
}

app.use('/', healthRoute)
app.use("/user", userRoute)
app.use("/script", scriptRoute)

configDB.testDBConnection()

app.listen(launchParams.PORT, () => {
    console.log(`
        Server is listening at http://${launchParams.HOST}:${launchParams.PORT}
        
        `)
    }
)