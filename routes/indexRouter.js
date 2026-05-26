const { Router } = require("express");
const messageController = require("../controllers/messageController")
const indexRouter = Router();

indexRouter.get("/",messageController.getAllMessages);
indexRouter.get("/new",messageController.getMessageForm);
indexRouter.post("/new",messageController.createMessage);
indexRouter.get("/message/:id",messageController.getMessageById);

module.exports = indexRouter ;
