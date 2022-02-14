const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const models = require('../models/index');
const admin = models.admin;

//endpoint ditulis disini

//endpoint untuk menampilkan semua data admin, METHOD: GET, function FINDALL()
app.get("/", (req,res) =>{
    admin.findAll()
        .then(admin => {
            res.json(admin)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menyimpan data admin, METHOD:POST, function, create
app.post("/", (req,res) => {
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.create(data)
        .then(result => {
            res.json({
                message : "data has been inserted"
            })
        })
        .catch(error => {
            message : error.message
        })
})

//endpoint untuk mengupdate data admin, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message  : error.message
        })
    })
})
//endpoint untuk menghapus data admin,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where: param})
    .then(result => {
        res.json({
            massege : "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: "error.message"
        })
    })
})

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

// endpoint login admin (authentication), METHOD: POST, function: findOne
app.post("/auth", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }
    // cari data admin yang username dan passwordnya sama dengan input
    let result = await admin.findOne({where: data})
    // ditemukan
    if(result){
        // set payload from data
        let payload = JSON.stringify(result)
        // generate token based on payload and secret_key
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }
    // tidak ditemukan
    else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app