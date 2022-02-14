//Import 
const express = require("express")
const cors = require("cors")

//Implementasi
const app = express()
app.use(cors())

//Endpoint Admin
const admin = require('./routes/admin')
app.use("/admin", admin)

//endpoint customer
const customer = require('./routes/customer');
app.use("/customer", customer)

//endpoint product
const product = require('./routes/product');
app.use("/product", product)

//Run Server (Penutup)
app.listen(1010, () => {
    console.log("Server run on port 1010");
})