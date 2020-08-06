const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());

// Database
connectDB();
// Middleware
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded());
// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/votes", require("./routes/votes"));
app.use("/api/data", require("./routes/data"));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
