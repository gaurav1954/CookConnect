const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')
mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log("connection sucessful")
    })
    .catch(() => {
        console.log("connect cant be established")
    })
const corsOptions = {
    origin: 'http://localhost:3000', // Replace this with the origin of your React application
    credentials: true // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(userRoutes)
app.listen(process.env.PORT, () => {
    console.log("working")
})