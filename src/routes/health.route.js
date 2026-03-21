const router = require("express").Router()
const configVariables = require("../config/launch.params").configVariables


router.get("/", (req, res, next) => {
    // Quick contain public info of parameters
    // ex, if account creation is disabled
    let quircks = []
    if(configVariables.NO_ACCOUNT_CREATION){
        quircks.push("Account Creation has been disabled by the administrator")
    }
    
    if(quircks.length === 0){
        quircks.push("No quicks has been found")
        quircks.push("Running default configuration")
    }

    try{
        res.status(200).json({
            "message": "API is ONLINE",
            quircks
        })
    } catch(err){
        next(err)
    }
})

module.exports = router