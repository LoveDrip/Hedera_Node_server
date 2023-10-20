

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const https = require("https");
const fs = require("fs")
const path = require("path");

const port = process.env.PORT || 3000;

const userRouter = require("./route.js")
require("./Config/Hederadb.js")

const app = express();

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  aloowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"]
}

app.use(cors(corsOpts));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/v3market.net/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/v3market.net/fullchain.pem', 'utf8')
}

app.use("/users", userRouter);

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname + '/build', 'index.html'));
});

var httpsServer = https.createServer(options, app);
httpsServer.listen(8000);

// app.listen(port, () => console.log("server started at 5000"));


