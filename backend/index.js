const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const routes = require('./routes/index');
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
    origin: ['http://localhost:3000', 'https://cook-connect-frontend.vercel.app'],
    credentials: true // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use('/', routes);
app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})