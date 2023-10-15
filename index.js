const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const https = require("https");
const fs = require("fs")
const path = require("path");

const userRouter = require("./route.js")
require("./Config/Hederadb.js")

const app = express();
app.use(cors());
app.use(express.json());

const options = {
  key: fs.readFileSync('selfsigned.key', 'utf8'),
  cert: fs.readFileSync('selfsigned.crt', 'utf8')
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '/frontend')));

// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname + '/frontend', 'index.html'));
// });

app.use("/users", userRouter);

var httpsServer = https.createServer(options, app);
httpsServer.listen(4000);

// app
//   .listen(8000, () => {
//     console.log("Server Started at port:8000");
//   })
//   .on("error", (err) => {
//     console.log("Server failed to start:8000", err);
//   });
