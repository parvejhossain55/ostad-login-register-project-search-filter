const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const dbConnection = require("./config/dbConnect");
const { readdirSync } = require("fs")

// application middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// dastabase connection
dbConnection();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.use("/api/v1", router);
// routes middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

app.listen(process.env.PORT || 8080, () => {
    // console.log("App Running..." + process.env.PORT);
});
