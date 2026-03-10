require("dotenv").config();
const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { loadModel } = require("./ml/predict");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Auth check middleware for the main page
app.get("/", (req, res) => {
    if (req.cookies.token) {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    } else {
        res.redirect("/auth.html");
    }
});

app.use(express.static("public"));

// Redirect logged-in users away from the login page
app.get("/auth.html", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "public", "auth.html"));
    }
});

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/chat", require("./routes/chatRoute"));
app.use("/api/hospitals", require("./routes/hospitalRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/doctor", require("./routes/doctorRoute"));
app.use("/api/health", require("./routes/healthRoute"));

loadModel();

const PORT = process.env.PORT || 5000;

async function start() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Healthcare AI ULTRA PRO Running on ${PORT}`);
    });
}

start();