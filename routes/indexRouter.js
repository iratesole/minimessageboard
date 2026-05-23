const { Router } = require("express");
const indexRouter = Router();

const messages = [
    {
        text : "Hi there!",
        user : "Amando",
        added : new Date()
    },
    {
        text : "hello World !",
        user : "Charles",
        added : new Date()
    }
];

indexRouter.get("/", (req,res)=>{
    res.render("index", { title : "Mini messages Board", messages : messages});
});

indexRouter.get("/new", (req,res) => {
    res.render("form", {title : "New Message"});
});

indexRouter.post("/new", (req,res) => {

    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;

    messages.push({
        text : messageText,
        user : messageUser,
        added : new Date()
    });

    res.redirect("/");
});

indexRouter.get("/message/:id", (req,res)=>{
    const messageId = req.params.id;
    const selectedMessage = messages[messageId];

    if(!selectedMessage){
        return res.status(404).send("Message Not Found");
    }

    res.render("details",{title: "Message Details", message : selectedMessage});
});

module.exports = indexRouter ;
