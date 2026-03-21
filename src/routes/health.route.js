const router = require("express").Router()

router.get("/", (req, res, next) => {
    try{
        res.status(200).json({
            "message": "API is ONLINE"
        })
    } catch(err){
        next(err)
    }
})

module.exports = router