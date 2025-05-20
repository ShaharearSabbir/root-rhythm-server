const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rootrhythm.2xpaliy.mongodb.net/?retryWrites=true&w=majority&appName=rootRhythm`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Collections
    const userCollection = client.db("RRDB").collection("users");
    const plantCollection = client.db("RRDB").collection("plants");

    // User API
    app.post("/users", async (req, res) => {
      const userProfile = req.body;
      const result = await userCollection.insertOne(userProfile);
      res.send(result);
    });

    app.get("/user/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid };
      const result = await userCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // Plant API

    app.post("/plant", async (req, res) => {
      const plantData = req.body;
      const result = await plantCollection.insertOne(plantData);
      res.send(result);
    });

    app.get("/plants", async (req, res) => {
      const result = await plantCollection.find().toArray();
      res.send(result);
    });
  } finally {
  }
};

run().catch(console.dir);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Plant is growing");
});

app.listen(port, () => {
  console.log(`plant is growing on http://localhost:${port}`);
});
