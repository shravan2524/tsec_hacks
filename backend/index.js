const http = require('http');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const { query } = require('express');

// Connection URI
const url = "mongodb+srv://shravan:ravilata@cluster0.yyer7.mongodb.net/project1?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected');
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  let items = req.body.data;
  console.log(items, "af");
  const newUser = new User({
    name: items.name,
    username: items.username,
    password: items.password,
  });
  newUser.save()
    .then((newUser) => {
      console.log("Record inserted");
      res.send("Success");
    })
    .catch((err) => console.log(err));
})

app.post("/login", (req, res) => {
  let { items } = req.body.data;
  console.log(req.body, items);
  let query = { username: req.body.data.username, password: req.body.data.password };
  console.log(query);
  User.find(query)
    .then((users) => {
      console.log(users, "shravan");
      if (users) {
        console.log("rignt matched");
        res.send(users);
      }
      else {
        let mes = "username / password is wrong";
        console.log("abc", users.length);
        res.send({ mes: mes });
      }
    })
    .catch(err => console.log(err));
})


app.post("/test", (req, res) => {
    console.log(req.body);
  })
  


app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
})