const express = require("express");

const app = express();

//Routes:
app.use("/api/users", require("./src/api/users-routes"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var fs = require("fs");

app.get("/api/users", (req, res) => {
  //res.send('<h1>Hello World!</h1>');
  fs.readFile("./src/data/data.json", function(err, data) {
    if (err) throw err;
    var parseData = JSON.parse(data);
    res.json(parseData.users);
  });
});

//Middleware function:
const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//Middleware execue:
app.use(logger)

app.get("api/users/:id", (req, res) => {
    fs.readFile("./src/data/data.json", function(err, data) {
      if (err) throw err;
      var parseData = JSON.parse(data);
      res.json(users.filter(user => user.id === req.params.id));
    });
  });

  app.get("api/users/:id", (req, res) => {
    fs.readFile("./src/data/data.json", function(err, data) {
      if (err) throw err;
      var parseData = JSON.parse(data);
      const found = parseData.users.some(user => user.id === req.params.id);
      if (found) {
        res.json(users.filter(user => user.id === req.params.id));
      } else {
        res.status(400).json({ msg: "User not found" });
      }
    });
  });


const PORT = process.env.PORT || 5000;

//Listen:
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));