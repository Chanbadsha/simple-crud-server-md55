const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

// Mongo db pass and username
// chanbadsha005;
// op7E9D2AUnBPvQOH;

// Mongo db pass and username

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb code

const uri =
  "mongodb+srv://chanbadsha005:op7E9D2AUnBPvQOH@cluster0.t47d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Get the database and collection on which to run the operation
    const database = client.db("usersDB");
    const userCollection = database.collection("userCollection");

    app.get("/user", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
      
      app.get(`/user/:id`, async (req, res) => {
          const id = req.params.id
          const userId = {_id: new ObjectId(id)}
          const user = await userCollection.findOne(userId)

          res.send(user)
        })

    app.post("/user", async (req, res) => {
      const users = req.body;
      console.log(users);
      const result = await userCollection.insertOne(users);
      res.send(result);
    });

    app.delete(`/user/:id`, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const userDlt = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(userDlt);
      res.send(result);
    });

    
      
    app.update(`/user/:id`, async (req, res) => {
      const id = req.params.id;
      const user = { _id: new ObjectId(id) };
        const result = await userCollection.updateOne(user);
        res.send(result)
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Crude server is running");
});
app.listen(port, () => {
  console.log(`Crud server is running on port: ${port}`);
});
