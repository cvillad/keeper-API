const express = require("express");
const app = express();
const db = require("./services/db");
const cors = require("cors");
const NoteController = require("./controllers/NoteController");
const UserController = require("./controllers/UserController");

app.use(cors());
app.use("/notes", NoteController);
app.use("/users", UserController);

module.exports = app;