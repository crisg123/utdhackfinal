const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const sendRoute = require("./routes/send");

// config
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);

// Middlewares
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/send", sendRoute);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})
