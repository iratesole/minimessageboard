const express = require("express");
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = 3001;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//what is this also what is a html form ? 
app.use(express.urlencoded({ extended : true}));

app.use("/",indexRouter);

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board Application running on port ${PORT} with URL : http://localhost:3001`);
});



