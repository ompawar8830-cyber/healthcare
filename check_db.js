require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
require("./config/db");

setTimeout(async () => {
    try {
        const u = await User.findOne({ phone: "9529344889" });
        console.log("User in DB:", u);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}, 2000);
