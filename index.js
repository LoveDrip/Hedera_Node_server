

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const https = require("https");
const fs = require("fs")
const path = require("path");

const port = process.env.PORT || 5000;

const userRouter = require("./route.js")
require("./Config/Hederadb.js")

const app = express();
app.use(cors());  

const options = {
  key: fs.readFileSync('selfsigned.key', 'utf8'),
  cert: fs.readFileSync('selfsigned.crt', 'utf8')
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '/build')))

//app.get('*', function (request, response) {
//  response.sendFile(path.resolve(__dirname + '/build', 'index.html'));
//});

app.use("/users", userRouter);

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname + '/build', 'index.html'));
});



app.use("/users", userRouter);

// var httpsServer = https.createServer(options, app);
// httpsServer.listen(port); 

app.listen(port, () => console.log("server started at 5000"));
