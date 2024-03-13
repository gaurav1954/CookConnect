const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')
dotenv.config();

mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log("connection sucessful")
    })
    .catch(() => {
        console.log("connect cant be established")
    })
app.use(cors())
app.use(userRoutes)
app.listen(process.env.PORT, () => {
    console.log("working")
})