const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://root-rhythm.web.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

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
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const userCollection = client.db("RRDB").collection("users");
    const plantCollection = client.db("RRDB").collection("plants");
    const categoryCollection = client.db("RRDB").collection("category");

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
      res.send(result);
    });

    // Home Page API

    app.get("/home", async (req, res) => {
      const categories = await categoryCollection.find().toArray();
      const latestPlants = await plantCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray();

      const easyPlants = await plantCollection
        .find({ careLevel: "easy" })
        .limit(6)
        .toArray();
      const result = {
        categories: categories,
        latestPlants: latestPlants,
        easyPlants: easyPlants,
      };
      res.send(result);
    });

    // Dashboard API

    app.get("/overview/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const totalNumberOFUsers = await userCollection.estimatedDocumentCount();
      const totalNumberOFPlants =
        await plantCollection.estimatedDocumentCount();
      const numberOfPlantsByUser = await plantCollection.countDocuments(query);
      res.send([
        { name: "Total Users", count: totalNumberOFUsers },
        { name: "Total Plants", count: totalNumberOFPlants },
        { name: "My Plants", count: numberOfPlantsByUser },
      ]);
    });

    // Category API

    app.post("/category", async (req, res) => {
      const category = req.body;
      result = await categoryCollection.insertOne(category);
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    app.get("/category/:category", async (req, res) => {
      const category = req.params.category;
      const query = { category: category };
      const result = await plantCollection.find(query).toArray();
      res.send(result);
    });

    // Plant API

    app.post("/plant", async (req, res) => {
      const plantData = req.body;
      const createdAt = new Date();
      plantData.createdAt = createdAt;
      const result = await plantCollection.insertOne(plantData);
      res.send(result);
    });

    app.get("/plants", async (req, res) => {
      const sortBy = req.query.sortBy;
      const order = req.query.order === "descending" ? -1 : 1;
      const page = parseInt(req.query.page);
      const plantsPerPage = parseInt(req.query.plantsPerPage);
      const skip = page * plantsPerPage;
      const sortOption = {};
      sortOption[sortBy] = order;
      const result = await plantCollection
        .find()
        .skip(skip)
        .limit(plantsPerPage)
        .sort(sortOption)
        .toArray();
      res.send(result);
    });

    app.get("/plantCount", async (req, res) => {
      const count = await plantCollection.estimatedDocumentCount();
      res.send({ count });
    });

    app.get("/latest", async (req, res) => {
      const result = await plantCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/plant/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await plantCollection.findOne(query);
      res.send(result);
    });

    app.get("/plants/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid };
      const result = await plantCollection.find(query).toArray();
      res.send(result);
    });

    app.put("/plant/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const plantUpdate = req.body;
        const updatedAt = new Date();
        plantUpdate.updatedAt = updatedAt;
        const filter = { _id: new ObjectId(id) };

        const updateDoc = {
          $set: {
            ...plantUpdate,
          },
        };

        const options = { upsert: true };

        const result = await plantCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to update plant" });
      }
    });

    app.delete("/plant/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await plantCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Plant is growing");
});

app.listen(port, () => {
  console.log(`plant is growing on http://localhost:${port}`);
});
