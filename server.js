const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const app = express();

const https = require("https"),
  fs = require("fs");


// const options = {
//   key: fs.readFileSync("/opt/lampp/certificatenew/privkey1.pem"),
//   cert: fs.readFileSync("/opt/lampp/certificatenew/fullchain1.pem")
// };



//const options = {
//  key: fs.readFileSync('Surviellance/certificatenew/privkey1.pem'),
//  cert: fs.readFileSync('Surviellance/certificatenew/fullchain1.pem')
//};


var corsOptions = {
    origin: "http://localhost:3017"
};

db.sequelize.sync();

//app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Max-Age" , 1000)
    res.header("Access-Control-Allow-Headers", "auth, auth_token, lang, Authorization, X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Smarg Application." });
});

require("./routes/routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

//https.createServer(options, app).listen(3015);
