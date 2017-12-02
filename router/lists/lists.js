const express = require("express")
const router = express.Router()
const db = require("../../db/index.js")
const cors = require('cors');
const app = express();
//logika zrobiona

router.get("/", (req, res) => {
    console.log("api/lists/")
    db.findAll()
        .then(data => {
         
        res.json(data)
            console.log("Wysłanie JSON z danymi z List: ")
        })
        .catch((err) => {
            console.log(`error lists.js: ${err}`)
        })
})
// pobierze dane wybranego elementu za pomocą ID
router.get("/:id",(req,res)=>{
    console.log("api/lists/id")
    db.getID(req.params.id)
    .then(data=>{
        res.json(data)
        console.log("Wysłanie JSON z danymi z List ID: ")
    })
    .catch((err) => {
        console.log(`error lists.js: ${err}`)
    })
})
//edycja wybranego elementu po ID
router.put("/:id", (req, res) => {
    console.log("edit list ")
    db.addList(req.params.id, req.body)
        .then(data => {
            console.log(`dodano do listy: ${data}`)
        })
        .catch((err) => {
            console.log(`error lists.js: ${err}`)
        })
})
// usun All
router.delete("/all", (req, res) => {
    console.log("delete all list")
    let status = 1; // zmienna informujcaca że dane należa do aktualnych list
    db.findAllStanRemove(status)
        .then(res.send("usunieto cala liste"))
        .catch((err) => {
            console.log(`error z usuwaniem listy: ${err}`)
        })
})
// usun wybrany element po ID
router.delete("/:id", (req, res) => {
    console.log("delete id from list")
    db.deleteID(req.params.id)
    then(data => {
            res.send(`dane zostały usuniete ${data}`);
        })
        .catch((err) => {
            console.log(`error z usuwaniem ID z listy: ${err}`)
        })
})
// Wykonanie listy
router.post("/:id", (req, res) => {
    console.log("close list")
    let status = 0 ; // zmienna informujcaca że dane należa do listy historycznej
    db.changeStan(req.params.id,status)
    .then(data=>{
        res.send(`zmiana statusu ${data}`)
    })
})

module.exports = router