//IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require('mongoose');

//imports from other files
const authRouter = require("./routes/auth");


//init

const PORT = 3000;

const app = express();
const DB = "mongodb+srv://nirajnandre11:NDN13*nj@cluster0.qsrl0fo.mongodb.net/cluster0?retryWrites=true&w=majority";
//middleware
app.use(express.json());
app.use(authRouter);

//client -> server -> client 

//connections
mongoose
.connect(DB)
.then(() =>{
    console.log("connection Successful");
})
.catch((e) =>{
    console.log(e);
});


app.listen(PORT,"0.0.0.0" ,() =>{
    console.log(`connected at port ${PORT}`);
});

