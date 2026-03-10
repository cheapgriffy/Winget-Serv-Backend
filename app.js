require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const scriptRoute = require('./src/routes/scripts.route')
const userRoute = require('./src/routes/user.route')
const configDB = require('./src/config/db')
const launchParams = require('./src/config/launch.params').configVariables



app.use("/user", userRoute)
app.use("/script", scriptRoute)

configDB.testDBConnection()

app.listen(launchParams.PORT, () => {
    console.log(`
        Server is listening at http://${launchParams.HOST}:${launchParams.PORT}
        
        `)
    }
)