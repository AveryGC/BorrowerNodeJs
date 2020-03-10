const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);

// DB connection
require("./config/db");

const borrowerRoutes = require("./controllers/borrowerController");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.xml());

app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.sendStatus(400); // Bad request
  }
  next();
});

app.use("/", borrowerRoutes);

module.exports = app.listen(3000, () => {
  console.log("Server 3000 has started!");
});
