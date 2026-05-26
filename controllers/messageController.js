const pool = require("../db/pool"); // Imported once here

// 1. GET ALL MESSAGES
exports.getAllMessages = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM messages ORDER BY added ASC");
        res.render("index", { title: "Mini Message Board", messages: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// 2. GET THE FORM PAGE
exports.getMessageForm = (req, res) => {
    res.render("form", { title: "New Message" });
};

// 3. POST A NEW MESSAGE
exports.createMessage = async (req, res) => {
    const { messageText, messageUser } = req.body;

    try {
        await pool.query(
            "INSERT INTO messages (text, username, added) VALUES ($1, $2, NOW())",
            [messageText, messageUser]
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving message");
    }
};

// 4. GET A SPECIFIC MESSAGE BY ID
exports.getMessageById = async (req, res) => {
    const messageId = req.params.id;

    try {
        const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [messageId]);
        const selectedMessage = rows[0];

        if (!selectedMessage) {
            return res.status(404).send("Message Not Found");
        }

        res.render("details", { title: "Message Details", message: selectedMessage });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving message details");
    }
};