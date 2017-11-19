const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const db = require("../../db/index.js")

//logika zrobiona

router.get("/",(req,res)=>{
    console.log("strona new list");
    console.log("test new list  " +__dirname)
    res.send("strona new list");
})

router.post("/",(req,res)=>{
    console.log(`testy body: ${req.body}`);
    db.createList(req.body)
    .then((data)=> {res.json(data);
        console.log("wynik zapytania "+ data)
    })
    .catch((err)=>{console.log(`error app.js: ${err}`)})
})

module.exports = router;


