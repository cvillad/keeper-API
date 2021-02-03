require("dotenv").config();
const mongoose = require("mongoose")

db_connection = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(db_connection, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);