require('dotenv').config();

const express = require("express");
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");

const app = express();
const port = process.env.PORT || 3001;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//To access the form data from req body so that it can be used in the express app? 
app.use(express.urlencoded({ extended : true}));

app.use("/",indexRouter);

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

app.listen((port), (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board Application running on port ${port}`);
});



