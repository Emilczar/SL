const express = require("express");
const router = express.Router();
const db = require("../../db/index")
const history = 0 // zmiena informuje ze dane należa do danych historycznych

//logika zrobiona
router.get("/", (req, res) => {
    db.findAllStan(history)
        .then(data => {
            res.json(data)
        })
        .catch((err) => {
            console.log(`error: ${err}`)
        })
    console.log("get all history list");
})

router.get("/:id", (req, res) => {
    db.getID(req.params.id)
    .then(data=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(`error: ${err}`)
    })
    console.log("get history ID " +req.params.id);
})

router.delete("/all", (res, req) => {
    db.findAllStanRemove(history)
    .then(res.send(`dane ususniete ${data}`))
    .catch((err)=>{
        console.log(`error: ${err}`)
    })
    console.log("delete all list")
})

router.delete("/:id", (req, res) => {
   db.deleteID(req.params.id)
   .then(data =>{
    res.send(`dane ususniete ${data}`)
   })
   .catch((err)=>{
    console.log(`error: ${err}`)
})
    console.log(`delete ID: ${req.params.id}`);
})

module.exports = router;