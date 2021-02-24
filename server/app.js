const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express(); // create express app

// MongoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://longnguyen:CS320Project@cs320db.aiuni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect({useUnifiedTopology: true});
    const database = client.db('Starship_Employee');
    const collection = database.collection('employee');
    // Query for a movie that has the title 'Back to the Future'
    const query = { isManager: true};
    const employee = await collection.findOne(query);
    console.log(employee);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle API Request
app.get("/", (req, res) => {
  res.send(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/authentication", (req, res) => {
  console.log(req.body);
  res.send("API Gateway for Authentication")
})



// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on localhost:5000");
});
