const mongoose = require("mongoose")
const db = require("./config_db/db_conect.json")
const fs = require("fs");
const path = require("path")
var Schema = mongoose.Schema;
var obj = JSON.parse(fs.readFileSync(path.join(__dirname, "config_db", "db_conect.json"), "utf8"));

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${obj.dbuser}:${obj.dbpassword}@ds163060.mlab.com:63060/ec_node1`);



const List = mongoose.model("Lista", new Schema({
    name: String,
    stan: Number,
    list: []
}, {
    collection: 'lista'
}))

function findAll() {
    return List.find({})
        .then((data) => data)
        .catch((err) => {
            console.log(`error findAll: ${err}`)
        })
}

function getID(id) {
    return List.findById(id)
        .then((data) => data)
        .catch((err) => {
            console.log(`error getID: ${err}`)
        })
}

function deleteID(id) {
    return List.findByIdAndRemove(id)
        .then((data) => data)
        .catch((err) => {
            console.log(`error: ${err}`)
        })
}

function addList(id, obj) {

    return List.findByIdAndUpdate(id, {
            $push: {
                list: obj
            }
        }, {
            new: true
        })
        .then(data => data)
        .catch(err => {
            console.log(`error addList : ${err}`)
        })
}


function newList(id, obj) {
    return List.findByIdAndUpdate(id, {
            list: obj
        })
        .then(data => data)
        .catch(err => {
            console.log(`error: ${err}`)
        })
}

function changeStan(id, obj) {
    return List.findByIdAndUpdate(id, {
            stan: obj
        })
        .then(data => data)
        .catch(err => {
            console.log(`error: ${err}`)
        })
}


function findAllStan(status) {
    return List.find({
            stan: status
        })
        .then(data => data)
        .catch((err) => {
            console.log(`error: ${err}`)
        })
}

function findAllStanRemove(status) {
    return List.find({
            stan: status
        })
        .remove()
        .then(data => data)
        .catch((err) => {
            console.log(`error: ${err}`)
        })
}

function createList(obj) {
    return List.create(obj)
        .then(data => data)
        .catch((err) => {
            console.log(`error: ${err}`)
        })
}


module.exports = {
    findAll,
    getID,
    deleteID,
    addList,
    newList,
    changeStan,
    findAllStan,
    findAllStanRemove,
    createList




}