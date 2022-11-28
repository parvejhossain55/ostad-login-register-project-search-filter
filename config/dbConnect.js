const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

    // mongoose.connection.on("connected", () => {
    //     console.log("Database Connection Successfully");
    // });

    mongoose.connection.on("error", (err) => {
        console.log("Database Connection Failed =>" + err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Database Connection Disconnected.");
    });
};

module.exports = dbConnection;
